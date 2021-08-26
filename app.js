class photoGallery {
    constructor() {
        this.API_KEY ="563492ad6f91700001000001ff436938d0894719b183677e4cd43ed3";
        this.galleryDiv = document.querySelector(".gallery");
        this.search_Form = document.querySelector(".header form");
        this.eventHandle();

    }
    eventHandle() {
        document.addEventListener("DOMContentLoaded",() => {
            this.getImg();
        })
        this.search_Form.addEventListener("submit",(e) => {
            this.getSearchedImage(e);
        })
    }
    async getImg(){
        const baseURL = "https://api.pexels.com/v1/curated?per_page=10";
       const data = await this.fetchImages(baseURL)
       this.generateHTML(data.photos)
       console.log(data);
    }
        
            async fetchImages (baseURL){
                const response = await fetch(baseURL,{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        Authorization:this.API_KEY
                    }

            }

        );
        const data = await response.json();
        return data;
    }
    generateHTML(photos){
        photos.forEach(photo =>{
            const item = document.createElement("div");
            console.log(item);
            item.classList.add("item");
            item.innerHTML=`
            <a href="#">
                      <img src="${photo.src.medium}">
                      <h3>"${photo.photographer}"</h3>
                    </a>`;
                    this.galleryDiv.appendChild(item);
        })
    }
    async getSearchedImage(e){
        e.preventDefault();
        this.galleryDiv.innerHTML="";
        const searchValue = e.target.querySelector("input").value
        const baseURL = await `https://api.pexels.com/v1/search?query=${searchValue}&per_page=12`
        const data = await this.fetchImages(baseURL)
       this.generateHTML(data.photos)
        
    }

}
const gallery = new photoGallery;
