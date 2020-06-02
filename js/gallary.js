$(document).ready(function(){
  var galleryOne = $("#galleryOne");
  var seeMore1 = $("#seeMore1");
  var data = ``;
  var limit = 8;
  var seeMoreCount = 8;
  var cd = limit;
  var numOfImg = 0;
  var PotFilterOff = true;
  var PText = '';
  var itemsArray = [];


  for (var i = 0; i < mainData.length; i++) {
    if(i === limit ) break;
    data += `
      <a data-cp="${mainData[i].cp}" 
         href="${mainData[i].src}">
        <img src="${mainData[i].tum}">
      </a>
    `;
    numOfImg = i;

    var zx = itemsArray.findIndex(
      function(item, i) {
      return item == i;
    });

    if(zx == -1){
      itemsArray.push(mainData[i].id);
    }
  }
  galleryOne.html(data);
  $('.gallery a').simpleLightbox({  captionAttribute:'data-cp'});


  seeMore1.click(function(){
    if(PotFilterOff){
      cd += limit;
      if (cd - limit == limit) {
        var x = cd - limit;
      }else {var x = cd - limit +1; numOfImg += 1;}

      for (var i2 = x; i2 < mainData.length; i2++) {
          if(cd == numOfImg) break;
          data += `
            <a data-cp="${mainData[i2].cp}" 
               href="${mainData[i2].src}">
              <img src="${mainData[i2].tum}">
            </a>
          `;

          var zx = itemsArray.findIndex(
          function(item, i2) {
            return item == i2;
          });

          if(zx == -1){
            itemsArray.push(mainData[i2].id);
          }
          numOfImg += 1;
      }
    }else {
      cd+=limit;
        var subMainData = mainData.filter(
        function(item) {
            return item.type == PText;
        });
       
        if(numOfImg == subMainData.length){
           seeMore1.text("That's it!");
        }

      for (var i5 = 0; i5 < mainData.length; i5++) {
          if(cd == numOfImg) break;
          var id = mainData[i5].id;
          var zx = itemsArray.findIndex(
          function(item) {
            return item === id;
          });
          if (zx !== -1) continue;
          if (PText != "All") if(mainData[i5].type != PText) continue;
          itemsArray.push(id);
          data += `
            <a data-cp="${mainData[i5].cp}" 
               href="${mainData[i5].src}">
              <img src="${mainData[i5].tum}">
            </a>
          `;
          numOfImg += 1;
      }
    }

    if(mainData.length == numOfImg || mainData.length < numOfImg){
       seeMore1.text("That's it!");
    }

    galleryOne.html(data);
    $('.gallery a').simpleLightbox({  captionAttribute:'data-cp'});
  });

    //filter
    var potFilter = $(".pot-filter ");
    potFilter.click(function(e){
      numOfImg = 0;
      cd = limit;
      itemsArray = []; 
      seeMore1.text("See More");
      PotFilterOff = false;
      PText = $(this).html();

      var parent = $(this).parent()[0];

      for (var i3 = 0; i3 < $(parent).children().length; i3++) {
        $($(parent).children()[i3]).removeClass('active-pf');
      }
      $(this).addClass("active-pf");
      galleryOne.fadeTo(100, .1);

      setTimeout(function(){
        galleryOne.fadeTo(100, 1);
        galleryOne.html("");
        data = "";

        for (var i4 = 0; i4 < mainData.length; i4++) {
          if(numOfImg === limit ) break;
          if(mainData[i4].type != PText && PText != "All") continue;
          data += `
            <a data-cp="${mainData[i4].cp}" 
               href="${mainData[i4].src}">
              <img src="${mainData[i4].tum}">
            </a>
          `;
          numOfImg += 1;
          var id = mainData[i4].id;
          var zx = itemsArray.findIndex(
          function(item) {
            return item == id;
          });

          if(zx == -1){
            itemsArray.push(id);
          }
        }
        galleryOne.html(data);
          $('.gallery a').simpleLightbox({  captionAttribute:'data-cp'});
        

      }, 500);

    });
});