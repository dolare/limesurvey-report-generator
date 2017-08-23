const PDFDocument = require('pdfkit');
const fs = require('fs');
const Q = require('q');

var generator = function(time, name, school, id, email, answer){

    return new Promise(function(resolve, reject){
        var passage_rule = {width:500, align: 'left', characterSpacing :3, lineGap: 5, paragraphGap: 6};
        var passage_rule_continued = {continued: true, width:500, align: 'left', characterSpacing :3, lineGap: 4, paragraphGap: 5};
        var passage_rule_1 = {width:500, align: 'left', characterSpacing :3, lineGap: 3, paragraphGap: 4};

        const TIME = time;
        const NAME = name;
        const SCHOOL = school;
        const ID = id;
        const EMAIL = email;
        const PASSAGE1 = '本测评系统的制定对于幼儿园和中、小学教师的职业心理健康必备要求进行了规定和量化为幼儿园及中、小学教师的选拔及在岗职业心理健康的评估和督导提供有效的依据。时代心理人事测评中心以人格理论为基础结合国内外人事测量的方法运用“实证标准法”确定了教师需要具备的与教师心理健康直接相关联的心理特征。';
        const PASSAGE2_1 = '对于教师来说心理健康特别重要它渗透到教师的所有教学活动中直接影响教师的教学模式进而影响学生的教学质量。本测验适用于在岗教师的职业心理健康水平评估和教师招聘考试中对教师职业心理健康水平的预测。';
        const PASSAGE2_2 = '本测验提供教师在几个纬度上相对全国常模的百分比。得分越低越偏向于低分特征分数越高越偏向于高分特征。';
        const PASSAGE2_3 = '不要孤立地解释分数每一项维度都与其他方面有一定的关联性不同个性特征是组合在一起共同对教师的教学方式起作用。在评定一个人的职业心理健康水平时一方面可以凭相关因素分数高低予以评估同时必须参考参测者其他心理健康的状况进行全面考察。';
        const PASSAGE2_4 = '心理健康水平具有内隐性外在行为表现可能存在不一致若出现此种情况需深入分析注意参测者年龄、性别、社会文化和民族背景及他目前所处的特殊情境。';
        const PASSAGE2_5 = '一般情况下心理健康水平较难改变但是可以通过专业的服务在行为层面上进行调整。';
        const PASSAGE3_1 = '本测验采用迫选测量方式共32组题目平均用时 ' + TIME + ' 秒。测验结果提供一个对教师心理8项特征的快速考察。您的测试结果如下图:';
        const PASSAGE3_2 = '分数高于100%说明参测者与全国常模比在这方面特点相对突出';
        const PASSAGE3_3 = '分数低于100%说明参测者与全国常模比在这方面表现相对示弱；分数如果低于50%建议结合具体情况关注该特点是否会带来其他问题。';
        //explaination start
        const PASSAGE4_1 = '1．重要他人的角色意识：教师的言行对学生的发展有重要影响';
        const PASSAGE4_1_1 = '低分特征：教师应加强认识到暴力、冷暴力、超越道德规范的行为，以及跨越教师角色的各种行为会降低教师对学生的影响力，并对学生长远心理发展产生破坏性影响。';
        const PASSAGE4_1_2 = '高分特征：教师意识到对学生采取暴力、冷暴力、超越道德规范的行为，以及跨越教师角色的各种行为会降低教师对学生的影响力，并对学生长远心理发展产生破坏性影响。';
        const PASSAGE4_2 = '2．角色定位：教师的角色定位与教育目标及学生发展的关系';
        const PASSAGE4_2_1 = '低分特征：教师尚需注重将角色定位于关爱者、引导者、支持者。教师应意识到自己的角色定位需要与教育目标一致，并有利于学生的发展。';
        const PASSAGE4_2_2 = '高分特征：教师的角色定位于关爱者、引导者、支持者。这种角色定位与教育目标一致，并有利于学生的发展。';
        const PASSAGE4_3 = '3．群体管理策略：教师针对学生群体进行整体管理的措施与方法';
        const PASSAGE4_3_1 = '低分特征：教师尚需提高群体管理策略来提升学生遵守规范的自觉性，和建立良好行为习惯。';
        const PASSAGE4_3_2 = '高分特征：教师采用有效的群体管理策略来提升学生遵守规范的自觉性，和建立良好行为习惯。';
        const PASSAGE4_4 = '4．主体意识导引策略: 教师对学生主体性的引导';
        const PASSAGE4_4_1 = '低分特征：教师尚需在教育教学过程中关注于学生的主体性，利用各种教育情境创建各种方法引导、激发学生自主性。';
        const PASSAGE4_4_2 = '高分特征：教师在教育教学过程中敏感于学生的主体性，利用各种教育情境创建各种方法引导、激发学生自主性。';
        const PASSAGE4_5 = '5． 情绪成熟度: 教师日常及处理与学生关系过程中表现的情绪特征';
        const PASSAGE4_5_1 = '低分特征：教师尚需提高稳定、积极的情绪特征和幸福感。在处理与学生的关系和突发事件的方式上也需更加成熟。';
        const PASSAGE4_5_2 = '高分特征：教师具有稳定、积极的情绪特征。有高水平幸福感。习惯用成熟和负责任的方式处理与学生的关系及突发事件。';
        const PASSAGE4_6 = '6． 理性自我认知: 教师对自我价值的判断和认识';
        const PASSAGE4_6_1 = '低分特征：教师尚需要架构正确的自我价值判断，增加自我价值感的稳定性以及认识并接纳自己的优点和缺点、保持心态平衡。';
        const PASSAGE4_6_2 = '高分特征：教师具有正确的自我价值判断，自我价值感稳定，能够认识并接纳自己的优点和缺点，能保持心态平衡。';
        const PASSAGE4_7 = '7．情绪调控: 教师在权威性面临学生挑战时如何调整自己的情绪状态';
        const PASSAGE4_7_1 = '低分特征：教师仍需加强情绪调控策略，并在与学生的互动过程中加强对自己进行情绪的有效调节。';
        const PASSAGE4_7_2 = '高分特征：教师掌握有效的情绪调控策略，并在与学生的互动过程中保持对自己进行情绪的有效调节。';
        const PASSAGE4_8 = '8．压力应对：教师如何应对教育工作中的负荷和挑战';
        const PASSAGE4_8_1 = '低分特征：教师尚需有效的策略来面对教学教育工作带来的高负荷。在应对教育情境中的各种挑战、困难、挫折和失败时仍需找到有效的缓解压力的措施与方法。';
        const PASSAGE4_8_2 = '高分特征：教师能承担教学教育工作带来的高负荷，面对教育情境中的各种挑战、困难、挫折和失败能找到缓解自己压力的措施与方法。';
        //end 
        const PASSAGE5_1 = '✧      本报告必须在受过专业培训人员的指导下使用';
        const PASSAGE5_2 = '✧      本报告内容属于个人隐私请注意保密'
        const PASSAGE5_3 = '✧      本报告包含的所有内容包括但不限于文本、数据、图片、图标、LOGO等的所有权都受到版权、商标或其他知识产权法的保护归时代心理智能开发科技有限责任公司所有。未经时代心理的书面许可不得修改、复制、翻译、分发、公开、出售任何从本报告中获取的信息、设计。'
        console.log(EMAIL)
        console.log(SCHOOL)
        console.log(NAME)
        console.log(ID)
        console.log(answer);
        var doc = new PDFDocument()

        var stream = doc.pipe(fs.createWriteStream(__dirname + '/output.pdf'))
        

        //page1
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.image(__dirname + '/images/page1_1.png',60,70,{width:480,height:600});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('陕西时代心理智能开发科技有限责任公司 印制',180,700);

        //page2
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135,height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + ID,470,46);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(14)
            .text('教师姓名： ' + NAME, 60,110);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(14)
            .text('学校： ' + SCHOOL,60,130);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('引  言',40,180,{align: 'center'});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('     ' + PASSAGE1,60,210, passage_rule);  

        //page3
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135,height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + id, 470, 46);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('阅读建议',60,85,{align: 'center'});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(13)
            .text('在阅读本报告前，您需了解以下原则',65,120);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(12)
            .text('    首先',65,150, {continued: true, characterSpacing:3})
            .font(__dirname + '/fonts/msyh.ttf')
            .text(PASSAGE2_1,passage_rule);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(12)
            .text('    其次', {continued: true, characterSpacing:3})
            .font(__dirname + '/fonts/msyh.ttf')
            .text(PASSAGE2_2,passage_rule);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(12)
            .text('    第三', {continued: true, characterSpacing:3})
            .font(__dirname + '/fonts/msyh.ttf')
            .text(PASSAGE2_3,passage_rule);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(12)
            .text('    第四', {continued: true, characterSpacing:3})
            .font(__dirname + '/fonts/msyh.ttf')
            .text(PASSAGE2_4,passage_rule);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(12)
            .text('    第五', {continued: true, characterSpacing:3})
            .font(__dirname + '/fonts/msyh.ttf')
            .text(PASSAGE2_5,passage_rule);

        //page4
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135, height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + id,470,46);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('测评结果',60,85,{align: 'center'});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + PASSAGE3_1.slice(0,4), 60, 115, passage_rule_continued)
            .font(__dirname + '/fonts/msyhbd.ttf')
            .text(PASSAGE3_1.slice(5,9),passage_rule_continued)
            .font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE3_1.slice(9), passage_rule);
        doc.image(__dirname + '/chart.png',120,200,{width:450, height:300});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('    ' + PASSAGE3_2,80, 550, passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('    ' + PASSAGE3_3,80, 570, passage_rule)
        doc.roundedRect(60,545,520,70,12).lineWidth(3).stroke('yellow');

        //page5
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135, height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + id,470,46);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('概念解释',60, 85,{align: 'center'});

        //explaination.........重要他人，角色定位，群体管理，主体意识，情绪成熟度，管理自我认知，情绪调控，压力应对..........
        var temp = '';
        if(answer.F < 4 ){
            temp = PASSAGE4_1_1;
        }else{
            temp = PASSAGE4_1_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_1,60, 125,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1);  
        if(answer.B < 3 ){
            temp = PASSAGE4_2_1;
        }else{
            temp = PASSAGE4_2_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_2,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('     ' + temp,passage_rule_1);  
        if(answer.C < 5 ){
            temp = PASSAGE4_3_1;
        }else{
            temp = PASSAGE4_3_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_3,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        if(answer.H < 5 ){
            temp = PASSAGE4_4_1;
        }else{
            temp = PASSAGE4_4_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_4,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        if(answer.D < 3 ){
            temp = PASSAGE4_5_1;
        }else{
            temp = PASSAGE4_5_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_5,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        if(answer.G < 3 ){
            temp = PASSAGE4_6_1;
        }else{
            temp = PASSAGE4_6_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_6,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        if(answer.E < 4 ){
            temp = PASSAGE4_7_1;
        }else{
            temp = PASSAGE4_7_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_7,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        if(answer.A < 5 ){
            temp = PASSAGE4_8_1;
        }else{
            temp = PASSAGE4_8_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_8,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 

            
        //page 6
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135, height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + id,470,46);
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('使 用 声 明',60, 85,{align: 'center'}); 
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE5_1, 80, 135, passage_rule); 
            doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE5_2, passage_rule); 
            doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE5_3, passage_rule); 
        doc.end()
        

       return resolve(stream);
    })
   
}

module.exports = generator;

