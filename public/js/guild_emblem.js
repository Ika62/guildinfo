  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var originalPixels = null;
  var currentPixels = null;

  var _colorMap = [
        // Background
        {"ff2088":[215,32,112],"bd005b":[171,0,76],"9e0036":[87,0,0],"ff891b":[225,105,26],"e14500":[180,56,0],"b1002e":[133,11,0],"ffb317":[237,151,22],"f68700":[205,110,0],
        "ae4b00":[155,61,0],"fffc14":[239,207,20],"f3ca00":[207,162,0],"c49b00":[158,113,0],"ffff14":[226,216,20],"d8dd00":[183,177,0],"a6ac00":[133,128,0],"e3f618":[206,209,24],
        "b7c003":[159,161,3],"8e9700":[112,115,0],"bcf61b":[153,206,27],"88ba03":[108,154,3],"588000":[65,108,0],"1eff68":[30,210,96],"04c347":[4,157,63],"00820f":[0,110,11],
        "1ef7c1":[29,206,169],"04b78f":[4,152,122],"009061":[0,107,74],"21dcff":[33,177,214],"009dc5":[3,109,139],"006391":[0,81,111],"4d8eda":[72,125,193],"2c6aae":[38,85,145],
        "003582":[0,39,98],"d34ac8":[188,75,195],"ad29ac":[145,42,155],"860f9a":[108,8,128],"ff38fa":[202,17,191],"c900c3":[173,0,162],"9b00a6":[124,0,116],"ff1fbf":[219,30,160],
        "d30087":[149,0,97],"a30068":[121,0,68],"c58132":[160,108,44],"875513":[108,66,15],"4f2300":[53,16,0],"232323":[15,26,31],"646464":[117,124,120],"b4bba8":[136,145,139],
        "d7ddcb":[156,166,159],"ffffff":[211,211,198],"fc6891":[229,107,140]},

        // Border
        {"670021":[97,42,44],"672300":[109,69,46],"674500":[119,101,36],"675600":[118,114,36],"639400":[108,118,36],"63a300":[85,108,48],"63b300":[76,109,48],"00671f":[48,108,66],
        "008e90":[48,105,107],"006793":[48,80,108],"00317c":[55,60,100],"6d0077":[87,54,100], "7b0067":[100,55,76],"54370a":[103,51,53],"ffffff":[153,159,149],"0f1415":[38,46,38],
        "f9cc30":[155,94,28]},

        // Emblem
        {"670021":[102,0,32],"672300":[103,35,0],"674500":[103,69,0],"675600":[103,86,0],"636700":[98,102,0],"516700":[80,102,0],"376700":[54,102,0],"00671f":[0,102,30],
        "006757":[0,102,86],"004867":[0,72,102],"092a5d":[9,42,94],"56095d":[86,9,94],"5d094f":[93,10,79],"54370a":[84,54,10],"b1b8b1":[177,183,176],"101517":[16,20,22],
        "dfa55a":[221,163,90]}
      ];


  function recolor(img, color, type) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
      originalPixels = ctx.getImageData(0, 0, img.width, img.height);
      currentPixels = ctx.getImageData(0, 0, img.width, img.height);
      var hexColor = color.substring(2,8);
      var newColor = _colorMap[type][hexColor] == undefined ? hexToRGB(hexColor) : rgbConvert(_colorMap[type][hexColor]);
      changeColor(img, newColor);
  }

  function hexToRGB(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return {
      'R' : r,
      'G' : g,
      'B' : b
    };
  }

  function rgbConvert(rgb) {
    return {
      'R' : rgb[0],
      'G' : rgb[1],
      'B' : rgb[2]
    };
  }

  function changeColor(img, newColor) {
      if(!originalPixels) return; // Check if image has loaded
      var intensityScale = 19;
      var blend = 1 / 3;
      var added_r = newColor.R / intensityScale + newColor.R * blend;
      var added_g = newColor.G / intensityScale + newColor.G * blend;
      var added_b = newColor.B / intensityScale + newColor.B * blend;
      var scale_r = newColor.R / 255 + blend;
      var scale_g = newColor.G / 255 + blend;
      var scale_b = newColor.B / 255 + blend;

      for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
      {
          if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
          {
              currentPixels.data[I] =  originalPixels.data[I] * scale_r + added_r;
              currentPixels.data[I + 1] =  originalPixels.data[I + 1]  * scale_g + added_g;
              currentPixels.data[I + 2] =  originalPixels.data[I + 2] * scale_b + added_b;
          }
      }

      ctx.putImageData(currentPixels, 0, 0);
      img.src = canvas.toDataURL("image/png");
  }
