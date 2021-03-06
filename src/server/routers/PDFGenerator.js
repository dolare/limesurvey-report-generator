const PDFDocument = require('pdfkit');
const fs = require('fs');
const Q = require('q');

var generator = function(time, name, school, id, email, answer, province, city){

    return new Promise(function(resolve, reject){
        var passage_rule = {width:500, align: 'left', characterSpacing :3, lineGap: 5, paragraphGap: 6};
        var passage_rule_continued = {continued: true, width:500, align: 'left', characterSpacing :3, lineGap: 4, paragraphGap: 5};
        var passage_rule_1 = {width:500, align: 'left', characterSpacing :3, lineGap: 3, paragraphGap: 4};

        const TIME = Math.round(time/60);
        const NAME = name;
        const SCHOOL = province + city + school;
        const ID = id;
        const EMAIL = email;
        const PASSAGE1 = '教师职业心理健康是教师教育教学活动的重要组成部分，其影响作用渗透在教师的所有教学活动中，直接影响教师的教学行为、教学模式进而影响学生的学习和发展。时代心理教师职业心理健康测评以经典人格理论为基础，结合国内外现代心理测量方法，运用“实证标准法”确定了教师需要具备的与职业心理健康直接相关联的人格、心理及能力特征。本测评系统以中、小学教师职业心理健康必备的要求为标准，对教师心理健康水平进行量化。测评结果为教师选拔及在岗职业心理健康的评估和督导提供有效的依据。';
        const PASSAGE2_1 = '本测验适用于在岗教师的职业心理健康水平评估和教师招聘考试中对教师职业心理健康水平的预测。';
        const PASSAGE2_2 = '本测验提供教师在多个纬度上相对全国常模的百分比。得分越低越偏向于低分特征，分数越高越偏向于高分特征。';
        const PASSAGE2_3 = '不要孤立地解释分数。每一项维度都与其他方面有一定的关联性。不同个性特征组合在一起共同影响教师的教学方式。在使用测评分数高低评估一个人的职业心理健康水平时，也必须同时参考参测者其他方面的心理健康的状况进行全面考察。';
        const PASSAGE2_4 = '心理健康水平具有内隐性，因此可能与外在行为表现不一致。若出现此种情况需深入综合分析参测者年龄、性别、社会经历、民族背景及他因素。';
        const PASSAGE2_5 = '一般情况下心理健康水平较难改变但是可以通过专业的服务在行为层面上进行调整。';
        const PASSAGE3_1 = '本测验采用迫选测量方式共32组题目共用时 ' + TIME + ' 分钟。测验结果提供一个对教师心理8项特征的快速考察。您的测试结果如下图:';
        const PASSAGE3_2 = '分数高于100%说明参测者与全国常模比在这方面特点相对突出';
        const PASSAGE3_3 = '分数低于100%说明参测者与全国常模比在这方面表现相对示弱';
        const PASSAGE3_4 = '分数如果低于50%建议结合具体情况关注该特点是否会影响教师教育教学工作的实际效果。';
        //explaination start
        //主体意识导引策略,  理性自我认知,  重要他人的角色意识, 情绪调控, 情绪成熟度, 群体管理策略, 角色定位, 压力应对
        const PASSAGE4_zhongyaotaren = '3．重要他人的角色意识：教师的言行对学生的发展有重要影响';
        const PASSAGE4_zhongyaotaren_1 = '低分特征：教师应进一步提升对暴力、冷暴力、超越道德规范的行为，以及跨越教师角色的各种行为对于学生的负面影响的意识，提升主动规避上述行为的能力。';
        const PASSAGE4_zhongyaotaren_2 = '高分特征：教师意识到教育教学中对学生采取暴力、冷暴力、超越道德规范的行为，以及跨越教师角色的各种行为会降低教师对学生的影响力，并对学生长远心理发展产生破坏性影响，并能够对于上述行为有效的进行规避与修正，为学生的发展与成长创造良好外部环境。';
        const PASSAGE4_juesedingwei = '7．角色定位：教师的角色定位与教育目标及学生发展的关系';
        const PASSAGE4_juesedingwei_1 = '低分特征：教师应进一步提升自身角色定位的意识与能力，将自身角色定位于学生成长中的“关爱者、引导者、支持者”，使自身角色定位与教育目标一致，促进学生的积极发展。';
        const PASSAGE4_juesedingwei_2 = '高分特征：教师能够将自身的角色定位于学生成长与学习中的关爱者、引导者、支持者角色。教师的这种角色定位与教育目标一致，并有利于学生的积极发展。';
        const PASSAGE4_guanlicelue = '6．群体管理策略：教师针对学生群体进行整体管理的措施与方法';
        const PASSAGE4_guanlicelue_1 = '低分特征：教师应进一步掌握与提高有效应用群体管理策略的能力，以提升学生遵守规范的自觉性，并促进学生建立良好行为习惯。';
        const PASSAGE4_guanlicelue_2 = '高分特征：教师能够熟练掌握教育教学中的群体管理策略，能够采用有效的群体管理策略来提升学生遵守规范的自觉性，并促进学生建立良好行为习惯。';
        const PASSAGE4_zhutiyishi = '1．主体意识导引策略: 教师对学生主体性的引导';
        const PASSAGE4_zhutiyishi_1 = '低分特征：教师应进一步提升在教育教学过程中关注学生主体性的意识，利用各种教育情境创建方法引导、激发学生自主性。';
        const PASSAGE4_zhutiyishi_2 = '高分特征：教师能够始终坚持以发展学生的主体性为教育教学的目标导向和价值追求，能够有效利用各种教育情境创建方法引导、激发学生自主性。促使学生自主、能动、创造性地进行学习和实践探索。';
        const PASSAGE4_qingxvchengshudu = '5． 情绪成熟度: 教师日常及处理与学生关系过程中表现的情绪特征';
        const PASSAGE4_qingxvchengshudu_1 = '低分特征：教师应保持稳定、积极的情绪状态。建议加强在处理与学生的关系和应对突发事件方式上的成熟性和积极性。';
        const PASSAGE4_qingxvchengshudu_2 = '高分特征：教师具有稳定、积极的情绪状态。善于运用成熟和负责任的方式处理与学生的关系及突发事件。';
        const PASSAGE4_lixingziwo = '2． 理性自我认知: 教师对自我价值的判断和认识';
        const PASSAGE4_lixingziwo_1 = '低分特征：教师应进一步架构正确的自我价值判断，增加自我价值感的稳定性，认识并接纳自己的优点和缺点、保持心态平衡。';
        const PASSAGE4_lixingziwo_2 = '高分特征：教师具有正确的自我价值判断，自我价值感稳定，能够认识并接纳自己的优点和缺点，能保持心态平衡。';
        const PASSAGE4_qingxvtiaokong = '4．情绪调控: 教师在权威性面临学生挑战时如何调整自己的情绪状态';
        const PASSAGE4_qingxvtiaokong_1 = '低分特征：教师应充分认识到情绪调控策略对于教育教学工作的重要影响及意义。掌握有效的情绪调控策略，在与学生的互动过程中加强对自己情绪的有效调节及管控。';
        const PASSAGE4_qingxvtiaokong_2 = '高分特征：教师能够有效运用情绪调控策略在与学生的互动过程中保持对自己情绪的有效调节及管控。';
        const PASSAGE4_yaliyingdui = '8．压力应对：教师如何应对教育工作中的负荷和挑战';
        const PASSAGE4_yaliyingdui_1 = '低分特征：教师应更加准确判断自身压力来源，正确认识压力对自己心态的影响，从多视角分析压力的各种内外来源和性质，找到缓解自己压力的有效措施和方案，避免因压力过大导致的各种生理和心理的消极反应。';
        const PASSAGE4_yaliyingdui_2 = '高分特征：教师能承担教学教育工作带来的高负荷，面对教育情境中的各种挑战、困难、挫折和失败能找到缓解自己压力的措施与方法。';
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
            .text('在阅读本报告前，您需了解以下原则',65,130);

        doc.moveDown();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .list([PASSAGE2_1],passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .list([PASSAGE2_2],passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .list([PASSAGE2_3],passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .list([PASSAGE2_4],passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .list([PASSAGE2_5],passage_rule)    

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
        doc.image(__dirname + '/chart.png',70,160,{width:530, height:350});
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('    ' + PASSAGE3_2,85, 550, passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('    ' + PASSAGE3_3,85, 570, passage_rule)
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('    ' + PASSAGE3_4,85, 590, passage_rule)
        doc.roundedRect(60,540,520,90,12).lineWidth(3).stroke('yellow');
        doc.image(__dirname + '/images/warning.jpg',70,560,{width:30, height:30});

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

        //H： 主体意识引导策略 
        //G： 自我认知
        //F： 重要他人 
        //E: 情绪调控 
        //D： 情绪成熟度 
        //C： 策略管理 
        //B: 角色定位
        //A: 压力应对
        //主体意识导引策略,  理性自我认知,  重要他人的角色意识, 情绪调控, 情绪成熟度, 群体管理策略, 角色定位, 压力应对
        //{ A: 4, B: 4, C: 4, D: 4, E: 3, F: 5, G: 3, H: 5 }
        //rule:this.answer.A / 5, this.answer.B / 3, this.answer.C / 5, this.answer.D / 3, this.answer.E / 4, this.answer.F / 4, this.answer.G / 3, this.answer.H / 5]

        var temp = '';
        console.log(answer)
        if(answer.H < 5 ){
            temp = PASSAGE4_zhutiyishi_1;
        }else{
            temp = PASSAGE4_zhutiyishi_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_zhutiyishi,60, 125,passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1);  
        
        doc.moveDown()
        if(answer.G < 3 ){
            temp = PASSAGE4_lixingziwo_1;
        }else{
            temp = PASSAGE4_lixingziwo_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_lixingziwo, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('     ' + temp,passage_rule_1);  

        doc.moveDown()
        if(answer.F < 4 ){
            temp = PASSAGE4_zhongyaotaren_1;
        }else{
            temp = PASSAGE4_zhongyaotaren_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_zhongyaotaren, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        
        doc.moveDown()
        if(answer.E < 4 ){
            temp = PASSAGE4_qingxvtiaokong_1;
        }else{
            temp = PASSAGE4_qingxvtiaokong_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_qingxvtiaokong, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        
        doc.moveDown();
        if(answer.D < 3 ){
            temp = PASSAGE4_qingxvchengshudu_1;
        }else{
            temp = PASSAGE4_qingxvchengshudu_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_qingxvchengshudu, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 
        
        doc.moveDown();
        if(answer.C < 5 ){
            temp = PASSAGE4_guanlicelue_1;
        }else{
            temp = PASSAGE4_guanlicelue_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_guanlicelue, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 

        //break page start 
        doc.addPage();
        doc.image(__dirname + '/images/head_1.png',60,20,{width:135, height:35});
        doc.lineWidth(0.8);
        doc.lineCap('butt').moveTo(60,60).lineTo(570,60).stroke();
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(10)
            .text('编号： ' + id,470,46);
        //break page end 
        doc.font(__dirname + '/fonts/msyhbd.ttf')
            .fontSize(14)
            .text('',60, 85,{align: 'center'});

        doc.moveDown();
        if(answer.B < 3 ){
            temp = PASSAGE4_juesedingwei_1;
        }else{
            temp = PASSAGE4_juesedingwei_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_juesedingwei, passage_rule_1);
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text('    ' + temp,passage_rule_1); 

        doc.moveDown();
        if(answer.A < 5 ){
            temp = PASSAGE4_yaliyingdui_1;
        }else{
            temp = PASSAGE4_yaliyingdui_2;
        }
        doc.font(__dirname + '/fonts/msyh.ttf')
            .fontSize(12)
            .text(PASSAGE4_yaliyingdui, passage_rule_1);
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

