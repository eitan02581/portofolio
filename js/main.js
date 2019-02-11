'use strict'


function initPage() {

  renderProj()
  renderModals()
}
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".zoom").css({
		backgroundSize: (100 + scroll/15)  + "%",
		top: -(scroll/10)  + "%", 
	});
});


function renderProj() {
  var projs = createProjs()
  var strHtml = gProj.map((proj, index) => {
    return `<div data-aos="zoom-in-up" data-aos-duration="1200" class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${index+1}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj.url}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.desc}</p>
        </div>
      </div>`
  })
  $('#proj-place').html(strHtml.join(''))
}

function renderModals() {
  console.log(gProj);

  var strHtml = gProj.map((proj, index) => {
    return `  <div class="portfolio-modal modal fade" id="portfolioModal${index+1}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div  class="container">
              <div  class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">
                     ${proj.title}
                    </p>
                    <img class="img-fluid d-block mx-auto" src="${proj.url}" alt="" />
                    <p>
                     ${proj.desc}
                    </p>
                    <button class="btn btn-info"><a href="${proj.link}">PLAY</a></button>
                    <ul class="list-inline">
                      <li>Date: ${proj.publishedAt}</li>
                      <li>Client: Threads</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  })
  $('#modal-proj-place').html(strHtml)
}

function onSendEmail() {
  sendEmail()
}
