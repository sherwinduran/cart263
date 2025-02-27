class Weed {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.weedDiv = document.createElement("div");
        let image = document.createElement('img');
        image.src = "assets/weeds.png";
        image.style.height = "100%";
        this.weedDiv.appendChild(image);

        this.image = image;
        this.renderWeed();
    }

    renderWeed() {
        this.weedDiv.classList.add('weed');
        this.weedDiv.style.width = this.size + "px";
        this.weedDiv.style.height = this.size + "px";
        this.weedDiv.style.left = this.x + "px";
        this.weedDiv.style.top = this.y + "px";
        this.image.style.width = (this.size * 8.5) + "px";

        document.querySelector('.grass').appendChild(this.weedDiv);
    }
}
