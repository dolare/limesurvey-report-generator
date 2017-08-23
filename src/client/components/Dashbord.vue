<template>
  <div>
    <main>
      <!-- Page Header -->
      <div class="bg-image overflow-hidden" :style="titleBgStyle">
        <div class="bg-black-op">
          <div class="content content-narrow">
            <div class="block block-transparent">
              <div class="block-content block-content-full">
                <h1 class="h1 font-w300 text-white animated fadeInDown push-50-t push-5">Times Mind Management System</h1>
                <h2 class="h4 font-w300 text-white-op animated fadeInUp">Welcome Administrator</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END Page Header -->

      <!-- Page Content -->
      <div class="content content-narrow">
        <!-- Dashboard Cards -->
        <div class="row">
          <div class="col-lg-6 col-lg-offset-3">
            <!-- Add Friend -->
            <div class="bg-image" :style="fnBlockBgStyle">
              <div class="bg-black-op">
                <div class="block block-themed block-transparent">
                  <div class="block-header">
                    <h3 class="block-title text-center">Report Generator</h3>
                  </div>
                  <div class="block-content text-center">
                    <div class="push">
                      <img class="img-avatar img-avatar96 img-avatar-thumb" src="assets/img/avatars/avatar10.jpg" alt="">
                    </div>
                    <!-- <h3 class="font-w300 text-white">Eric Lawson</h3> -->
                  </div>
                  <div class="block-content block-content-full text-center">
                    <router-link :to="{ name: 'rptGnt' }">
                      <a class="btn btn-sm btn-default">
                        <i class="fa fa fa-superpowers text-success"></i>
                        &nbspGenerate!
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- END Add Friend -->
          </div>


        </div>
        <!-- END Dashboard Cards -->
      </div>
      <!-- END Page Content -->
    </main>
  </div>
</template>

<script>
  import titleBgImg from '../public/image/titleBgImg.jpg'
  import fnBlockBgImg from '../public/image/fnBlockBgImg-rpt.jpg'

  export default {
    data () {
      return {
        titleBgStyle: {
          backgroundImage: 'url(' + titleBgImg + ')'
        },
        fnBlockBgStyle: {
          backgroundImage: 'url(' + fnBlockBgImg + ')'
        }
      }
    }
  }
</script>
