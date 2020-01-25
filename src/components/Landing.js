import React, { Component } from "react";

class Landing extends Component {
    render() {
        return (
            <div>
                <div>
                    <div class="jumbotron" style={{ width: "100%", backgroundColor: "#3A3A3C" }}>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-md-push-12 text-center">
                                    <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                        alt="truck.png" src="./images/truck.png" style={{ borderRadius: "50%" }} data-source-index="1" />
                                </div>
                                <div class="col-md-12 col-md-pull-12">
                                    <div class="type-h3" style={{ color: "#25AAE1", }}>
                                        Transport Jobs
                    </div>
                                    <div class="type-sh3" style={{ color: "#949496", }}>
                                        Transport Services On-The-Go!
                    </div>
                                    <p style={{ color: "#D1D2D4", }}>Morbi porta elit vel ante tempus, vel fringilla augue tincidunt. Donec vehicula lorem velit, at pulvinar purus maximus at. Sed id libero interdum, pellentesque magna eu, varius ex. Morbi quis leo consequat, tempor massa ut, gravida enim. Nam a neque in turpis dapibus varius ut ut tortor. Cras sagittis massa nisi. Aliquam mollis, lectus molestie finibus vulputate, neque sem posuere tellus, eu dapibus erat massa id tortor. Vivamus sed dictum sapien, et tristique odio. Quisque ac ligula viverra, sollicitudin sapien in, sollicitudin est. Cras ultrices malesuada porttitor. Nunc non enim eget eros gravida sodales.</p>
                                    <h4 style={{ fontWeight: "bold", color: "#D1D2D4", }}>
                                        SABER MAIS
                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="jumbotron theme-dark" style={{ backgroundColor: "#202020", }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-24 text-center">
                                <div class="row section-gallery">
                                    <div class="col-md-8">
                                        <h4 style={{ fontWeight: "bold", }}>LOCALIZAÇÃO</h4>
                                        <div class="type-p1 text-center">
                                            Centro
                            <br />
                                            Rio De Janeiro, Brasil
                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h4 style={{ fontWeight: "bold", }}>AO REDOR DO GLOBO</h4>
                                        <div class="type-p1 text-center text-light" style={{ color: "#25AAE1", }}>
                                            <a class="fa" href="#">
                                                <i class="fab fa-fw fa-facebook-f"></i>
                                            </a>
                                            <a class="fa" href="#">
                                                <i class="fab fa-fw fa-instagram"></i>
                                            </a>
                                            <a class="fa" href="#">
                                                <i class="fab fa-fw fa-twitter"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h4 style={{ fontWeight: "bold", }}>SOBRE NOS</h4>
                                        <div class="type-p1 text-center">"Transport Jobs" e criado por Core Infinite. Para obter mais informacoes, visite <a style={{ textDecoration: "none", color: "#25AAE1", }} href="#" class="color-type-accent">coreinfinte.com</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Landing;