
// Gestion des images en fonction de la densité de pixels de l'écran du device
function ResponsiveImages() {

}

// enregistrement de l'outil dans le namespace it&l@bs
$.it.rimages = new ResponsiveImages();

ResponsiveImages.prototype.update = function(element)
{
    // console.log("START : ResponsiveImages.update for "+page.attr("id"));
    
    var ratio = 1;
    
    if(window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }

    var scale = ratio > 1 ? "2x" : "1x";
    
    $(element).find("img").each(function(){
        var el = $(this);
        el.attr("src", $(this).data(scale));
        el.removeAttr("data-1x");
        el.removeAttr("data-2x");
    });

    // console.log("END : ResponsiveImages.update for "+page.attr("id"));
};