var carousel2 = "carousel1.jpeg";
var carousel1 = "carousel2.jpeg";
var carousel3 = "carousel3.jpeg";
var carousel4 = "carousel4.jpeg";
var carouselImgStyle={
    height:"350px"
}
function Carousel(){
    return(
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img style={carouselImgStyle} src={carousel2} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img style={carouselImgStyle} src={carousel3} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img style={carouselImgStyle} src={carousel1} class="d-block w-100" alt="..."/>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
    )
}

export default Carousel