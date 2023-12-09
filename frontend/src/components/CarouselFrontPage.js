import carousel1 from "../img/carousel1.jpg"
import carousel2 from "../img/carousel2.jpg"
import carousel3 from "../img/carousel3.jpg"

function Carousel() {
    return  <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">    
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active item" >
        <img src={carousel1} class="d-block w-100" alt="..." />
        <div class="container">
            <div class="carousel-caption">
                <h1>Nowoczesny sprzęt</h1>
            </div>
        </div>
      </div>
      <div class="carousel-item item">
        <img src={carousel2} class="d-block w-100" alt="..." />
        <div class="container">
            <div class="carousel-caption">
                <h1>Plany treningowe</h1>
            </div>
        </div>
      </div>
      <div class="carousel-item item">
        <img src={carousel3} class="d-block w-100" alt="..." />
        <div class="container">
            <div class="carousel-caption">
                <h1>Profesjonalni trenerzy</h1>
            </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
}

export default Carousel