<template>
  <div class='row'>
    <h1 class="text-center push-30-t">Report Generator</h1>
    <div class='col-lg-5 col-lg-offset-1'>
      <label class='btn btn-block btn-default'>
        <i class='fa fa-superpowers' aria-hidden='true'></i>
        <input type='file' @change='onFileChange'>
        {{ fileName }}
      </label>
    </div>
    <div class='col-lg-5'>
      <button class='btn btn-block btn-success' :disabled="tableData == ''">Generate!</button>
    </div>
    <div class='col-lg-6'>
      <button class='btn btn-block btn-success' @click="generateFormBrowser" >generateFormBrowser!</button>
    </div>
    <div class='col-lg-6'>
      <button class='btn btn-block btn-success' @click="generateFormServer" >generateFormServer!</button>
    </div>
    <div class='col-lg-12 table-ctn' v-if="tableData !== ''">
      <table class="table table-bordered table-hover table-striped table-header-bg">
        <thead>
          <tr>
            <th class="text-center">date_created</th>
            <th class="text-center">date_modified</th>
            <th class="text-center">enabled</th>
            <th class="text-center">fetch_error_count</th>
            <th class="text-center">last_change_date</th>
            <th class="text-center">last_check_date</th>
            <th class="text-center">last_http_code</th>
            <th class="text-center">last_reason</th>
            <th class="text-center">object_id</th>
            <th class="text-center">raw_content_checksum</th>
            <th class="text-center">revision</th>
            <th class="text-center">text_content_checksum</th>
            <th class="text-center">url</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dataRow in tableData">
            <td class="text-center">{{ dataRow.object_id }}</td>
            <td class="text-center">{{ dataRow.date_modified }}</td>
            <td class="text-center">{{ dataRow.enabled }}</td>
            <td class="text-center">{{ dataRow.fetch_error_count }}</td>
            <td class="text-center">{{ dataRow.last_change_date }}</td>
            <td class="text-center">{{ dataRow.last_check_date }}</td>
            <td class="text-center">{{ dataRow.last_http_code }}</td>
            <td class="text-center">{{ dataRow.last_reason }}</td>
            <td class="text-center">{{ dataRow.object_id }}</td>
            <td class="text-center">{{ dataRow.raw_content_checksum }}</td>
            <td class="text-center">{{ dataRow.revision }}</td>
            <td class="text-center">{{ dataRow.text_content_checksum }}</td>
            <td class="text-center">{{ dataRow.url }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import Babyparse from 'babyparse'
import filesaver from 'file-saver'
import Jspdf from 'jspdf'

export default {
  data () {
    return {
      fileName: 'Upload CSV File',
      fileinput: '',
      tableData: ''
    }
  },
  methods: {
    generateFormServer: function() {
      this.$http.post('/pdf').then(response => {
        this.sources = response.data
        console.log(this.sources)
        var blob = new Blob([this.sources], {type: 'application/pdf'})
        filesaver.saveAs(blob, 'AwesomePDF')
      })
    },
    generateFormBrowser: function() {
      var doc = new Jspdf()
      doc.text('hello world!', 10, 10)
      doc.save('output.pdf')
    },
    fileinput: function(value) {
      this.tableData = value.data
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
  div.row {
    margin: 0 0;
    height: 100%;
  }

  label {
    position: relative;
    margin: 20px auto;
  }

  button {
    margin: 20px auto;
  }

  input {
    position: absolute;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  div.table-ctn {
    padding: 0 0;
    overflow-x: auto;
    overflow-y: auto;
  }

</style>
