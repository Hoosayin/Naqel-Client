import React, { Component } from "react";

class Footer extends Component {
    render() {

        return (
            <footer class="border-top footer theme-default color-bg-light-neutral-high text-light">
                <div class="container">
                    &copy; {new Date().getFullYear()} - Core Infinite - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                </div>
            </footer>
        );
    }
};

export default Footer;