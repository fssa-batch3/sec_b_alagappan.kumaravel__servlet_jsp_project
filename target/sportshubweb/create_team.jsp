<!DOCTYPE html>
<%@page import="in.fssa.sportshub.model.Team"%>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home page for newmember</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer">
		<link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.28/dist/sweetalert2.min.css" rel="stylesheet">
		
    </head>
	<style>
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');

:root {
    --offwhite: #f0f0f0;
    --white: #ffffff;
    --red: #96352c;
    --ltgreen: #14b393;
    --fntwight: #f7f7f7;
    --icncolor: #72787f;
    --drakgray: #2a373f;
    --logoorange: #ff8908;
	--background-page: #111020;
    --tran: .3s;
  }

body{
    padding: 0;
    margin: 0;
    background-color: var(--white);
}  


/* loading start*/

#load_body{
	display: none;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--background-page);
    opacity: 0.8;
    position: fixed;
    z-index: 1111;
}
.loading-cont {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}
.cont {
    width: 100%;
    height: 100%;
    animation-name: rotate;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
.loading-cont::before {
    content: 'Loading...';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    border-radius: 50%;
    color: #ff8908;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    text-shadow: 0 0 5px #ff8908,
        0 0 10px #ff8908,
        0 0 20px #ff8908,
        0 0 30px #ff8908,
        0 0 50px #ff8908;
    z-index: 111;
    background-color: var(--background-page);
}
.loading-cont .cont span {
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: #ff8908;
}
.loading-cont .cont span:first-child {
    top: 0;
    left: 0;
    transform-origin: top left;
    animation-name: loading;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
.loading-cont .cont span:nth-child(2) {
    bottom: 0;
    right: 0;
    transform-origin: bottom right;
    animation-name: loading;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;    
}
@keyframes loading {
    0% {
        transform: scale(.3);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(.3);
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* loading end*/

/* main start */
main{
    font-family: 'Source Sans Pro', sans-serif;
    width: 100%;
    height: 115vh;
}
section.first{
    display: block;
}
section.second{
    display: none;
}

/* toggle button css start */

.toggle_button{
    position: absolute;
    top: 0;
    left: 0%;
    color: #000;
    background-color: var(--drakgray);
    border-bottom: 3px solid var(--logoorange);
    width: 50%;
    height: 55%;
    padding: 7px 0;
    margin: 3px 0px;
    z-index: 1;
    transition: .5s;

}

.darkbtn{
    font-size: 16px;
    font-weight: 600;
    background-color: transparent;
    border: none;
    border-radius: 30px;
    color: #fff;
    width: 50%;
    height: 100%;
    padding: 7px 0;
    margin: 3px 0px;
    z-index: 111;
    transition: .5s;
}

.lightbtn{
    font-size: 16px;
    font-weight: 600;
    background-color: transparent;
    border: none;
    border-radius: 30px;
    color: #000;
    width: 50%;
    height: 100%;
    padding: 7px 0;
    margin: 5px 0px;
    z-index: 111;
    transition: .5s;
}

/* toggle button css end */
.changephoto{
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    position: relative;
}
/* .changephoto input{
    width: 30%;
    height: 120px;
    border-radius: 100%;
    border: 1.5px solid var(--icncolor);
    margin: 20px 0px 10px 0px;
} */

.team_image_show, #team_image_show{
    width: 30%;
    height: 120px;
    /* border-radius: 100%; */
    /* border: 1.5px solid var(--icncolor); */
    margin: 20px 0px 10px 0px;
}
.changephoto input[type="file"]{
    position: absolute;
    height: 70%;
    opacity: 0;
}
.changephoto label{
    display: block;
    color: var(--icncolor);
    font-size: 14px;
    font-weight: 500;
    /* margin-right: auto;
    margin-left: 7%; */
}
/* form start */
form{
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}
form label{
    display: block;
    color: var(--icncolor);
    font-size: 14px;
    font-weight: 500;
    margin-left: 5%;
}
form input, form select, form textarea, #team_image{
    width: 90%;
    margin-left: 5%;
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px 0px;
    border: none;
    border-bottom: 1.5px solid var(--offwhite);
}
/* same user name */
.wrong_password{
    size: 14px;
    color: var(--red);
    margin-left: 5%;
}



form input:focus, form select:focus, form textarea:focus, #team_image:focus{
    outline: none;
}
/* form end */
.updatediv, .deletediv{
    width: 90%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    height: 7%;
    margin-top: 20px;
}
.updatediv button{
    width: 100%;
    border: none;
    padding: 10px 0px;
    font-size: 16px;
    font-weight: 500;
    background-color: var(--ltgreen);
    color: var(--white);
    cursor: pointer;
}

.deletediv button{
    width: 100%;
    border: none;
    padding: 10px 0px;
    font-size: 16px;
    font-weight: 600;
    background-color: #96352cdd;
    color: var(--white);
    cursor: pointer;
}

form div{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
}
/* team edit start */
  /* on/off switch start */
.onoffdiv{
    margin-left: 5%;
    display: inline;
    margin-bottom: 15px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 0 0 15px 0;
    transform:scale(0.5);
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:after {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:after {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(26px);
  }

.slider.round {
    border-radius: 34px;
  }
  
  .slider.round:after {
    border-radius: 50%;
  }
  /* on/off switch end */

.headerbottom{
    position: relative;
    width: 100%;
    height: 45px;
    margin-bottom: 20px;
    background-color: var(--offwhite);
    display: flex;
}
.headerbottom a{
    flex-grow: 3;
}


/* team detail start */
.teams{
    width: 97%;
    background-color: var(--white);
    margin-top: 10px;
    padding: 10px 0px;
    border-radius: 5px;
    box-shadow: 0 0px 10px 0px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;

}
.teamimagediv{
    width: 20%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    
}
.teamprofile{
    width: 60px;
    height: 60px;
    border-radius: 100px;
}
.teamdetaildiv{
    height: 100%;
    width: 80%;
    padding-left: 10px;
}
.teamdetaildiv div:nth-child(1){
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}


.teamdetaildiv p{
    margin: 0;
}
.playername{
    font-size: 16px;
    font-weight: 600;
    color: var(--drakgray);
}

.teamdetaildiv div:nth-child(1) div:nth-child(2){
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: start;
    margin-right: 10px;
    
}

.matchdetails{
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: initial;
    justify-content: start;
    
}
.matchdetails p{
    font-size: 14px;
    margin-left: .5rem;
    color: var(--icncolor);
}
.teams i {
    color: var(--icncolor);
}

.teamdetaildiv a{
    text-decoration: none;
    color: var(--logoorange);
    font-size: 16px;
}
a.switchcap{
    color: var(--ltgreen);
}

/* team details end */



/* team edit end */

/* switch captain start */
.background{
    width: 100%;
    height: 100vh;
    background-image: url(../images/backforswitchcaptain2.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.content{
    width: 80%;
    height: 80vh;
    overflow-y: scroll;
    box-shadow: 0 0px 10px 0px rgba(0,0,0,0.4);
    background-color: var(--offwhite);

}
.headtop{
    width: 100%;
    height: 8vh;
    background-color: var(--drakgray);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    position: sticky;
    top: 0;
    border-radius: 3px;
}
.headtop h1{
    font-size: 24px;
    font-weight: 600;
    color: var(--white);
}
.headtop i{
    font-size: 1.3rem;
    color: var(--white);
    padding: 0px 30px 0px 15px;
}


/* main end */

.popup_content{
    font-family: 'Source Sans Pro', sans-serif;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 111;
    transform: scale(.1); 
    visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s; 
}
.open-popup{
    visibility: visible;
    transform: scale(1); 
}

.popup-content{
    width: 320px;
    height: 530px;
    background-color: var(--white);
    position: relative;
    
}

.deleteTeam{
    margin-right: 0;
    margin-left: auto;
}


@media only screen and (min-width: 900px){
    main.createteam-main{
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0px 10px 0px rgba(0,0,0,0.4);
    }

    main.createteam-main form{
        transform: scale(1.1);
        padding-top: 80px;
        padding-bottom: 60px;
    }

    
}
/* header start */
header{
    width: 100%;
    height: 7vh;
    background-color: #ff8908;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
}
header h1{
    font-size: 22px;
    font-weight: 600;
    color: var(--fntwight);
    font-family: 'Source Sans Pro', sans-serif;
}
header i{
    font-size: 1.3rem;
    color: var(--fntwight);
    padding: 0px 30px 0px 15px;
}

/* header end */

@media only screen and (min-width: 900px){
    header.createteam-header ,header.response-header, header.team-response-header, header.match-invitation-header, header.calender-header{
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0px 10px 0px rgba(0,0,0,0.4);
    }
}

	</style>
    <body>
        <div id="load_body">
    <div class="loading-cont">
        <div class="cont">
            <span></span>
            <span></span>
        </div>
    	</div>
    </div>      
        <!-- header start -->
        <header class="createteam-header">
            <a onclick="previousPage()">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h1>Create Team</h1>
        </header>
        <!-- header end -->
        <!-- main start -->
  		<script async src="//freeimage.host/sdk/pup.js" data-url="https://freeimage.host/upload"></script>
        
        <main class="createteam-main">
            <div class="changephoto">
                <input type="image" src="https://iili.io/HWEqLtp.webp" alt="" id="team_image_show">
                <textarea id="image_host_url" style="visibility:hidden;"></textarea>
                
                <!-- <label>Upload team Photo</label> -->
            </div>
  				<% String data = (String) request.getParameter("error"); %>
  				<% Team team = (Team) request.getAttribute("team-new"); %>
       			<% if(data != null){ %>

            <p id="error_msg"class="wrong_password"><%= data %></p>
                   			<%} %>
            <form action="create" method="get">
               <input id="playerId" type="hidden" name="playerId" value="" >
				
                <label>Team name</label>
             
                <input id="teamname" name="teamName" value="<%= team != null ?team.getTeamName() :""%>" title="Use firstletter between (A-Z) and min 15 character" pattern="^[a-zA-Z][a-zA-Z\s]{1,30}$" type="text" required> 
                <p class="wrong_password"></p>
                
                <label class="hide" >Area & District</label>
				<div class="hide" id="address-form">   
                    <input id="addressSearch" type="text" placeholder="Search and enter your area"  onchange="display()" >
                </div>
                
                <label class="unhide"  style="display:none;">Area</label> 
                <input class="unhide" id="area" name="area" value="<%= team != null ?team.getAddress().getArea() :""%>" type="text" onclick="display1()" style="display:none;" readonly> 

                <label class="unhide"  style="display:none;">Distric</label>
                <input class="unhide" id="distric" type="text" name="district" value="<%= team != null ?team.getAddress().getDistrict() :""%>" onclick="display1()" style="display:none;" readonly>

                <label>About</label>
                <input id="team_about" name="about" maxlength="50" value="<%= team != null ?team.getAbout() :""%>" >

                <label>Open for players</label>
                <input id="team_player_description" name="teamPlayerDescription" placeholder="Eg: we need one good allrounder " minlength="5" maxlength="50"  value="<%= team != null ?team.getOpenForPlayerDescription() :""%>" required>
		 		<input id="team_image" style="visibility:hidden;" type="url" name="url" value="<%= team != null ?team.getUrl() :"https://iili.io/HWEqLtp.webp"%>" pattern="https?://.+\.(jpg|jpeg|png|gif|bmp|webp)$">
                <div class="updatediv">
                    <button type="submit">Create my team</button>
                </div>
            </form>	
             
        </main>
     
        <!-- main end -->
        <script src="https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js"></script>
        <script src="./assets/js/vendor/lib/moment/moment.min.js">
	</script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.28/dist/sweetalert2.all.min.js"></script>
         	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhGk3DTCkjF1EUxpMm5ypFoQ-ecrS2gY&callback=initAutocomplete&libraries=places&v=weekly"
        defer></script>
        <script>
        

		   const loadingPage = document.getElementById("load_body");

			 let playerId = JSON.parse(sessionStorage.getItem("playerId"));
	        document.getElementById("playerId").value = playerId;
	        
        let autocomplete;
        let address1Field;
		const searchAddress = document.querySelectorAll(".hide");
		const areaAndDistrict = document.querySelectorAll(".unhide");
        if(document.querySelector("#area").value != ""){
        	areaAndDistrict.forEach(element => {
        	    element.style.display = 'block';
        	});
        	searchAddress.forEach(element => {
        	    element.style.display = 'none';
        	});
        }
		
        function initAutocomplete() {
            address1Field = document.querySelector("#addressSearch");

            console.log(address1Field)
            
            autocomplete = new google.maps.places.Autocomplete(address1Field, {
                componentRestrictions: { country: ["in"] },
                fields: ["address_components", "geometry"],
                types: ["geocode"],
            });
            autocomplete.addListener("place_changed", fillInAddress);
        }
        function fillInAddress() {
            const place = autocomplete.getPlace();
            console.log(place)
            let address1 = "";
            let postcode = "";
            let localityName;
            let administrativeAreaName;
            let subLocalityName;
            let subLocalityName2;
            for (const component of place.address_components) {
                const componentType = component.types[0];
                switch (componentType) {
                    case "street_number": {
                        address1 = `${component.long_name} ${address1}`;
                        break;
                    }
                    case "route": {
                        address1 += component.short_name;
                        break;
                    }
                    case "postal_code": {
                        postcode = `${component.long_name}${postcode}`;
                        break;
                    }
                    case "postal_code_suffix": {
                        postcode = `${postcode}-${component.long_name}`;
                        break;
                    }
                    case "locality": {
                        localityName = component.long_name;
                        break;
                    }
                    case "sublocality_level_3": {
                        subLocalityName2 = component.long_name;
                        break;
                    }
                    case "sublocality_level_1": {
                        subLocalityName = component.long_name;
                        break;
                    }
                    case "administrative_area_level_3":
                        administrativeAreaName = component.long_name;
                        document.querySelector("#distric").value = component.long_name;
                        break;
                }
            }
            if (localityName === administrativeAreaName) {
                document.querySelector("#area").value = subLocalityName;
            }
            else {
                document.querySelector("#area").value = localityName;
                
            }
            address1Field.value = address1;
            address1Field.focus();
            areaAndDistrict.forEach(element => {
        	    element.style.display = 'block';
        	});
        	searchAddress.forEach(element => {
        	    element.style.display = 'none';
        	});
        }
        // window.initAutocomplete = initAutocomplete;
        
        loadingPage.style.display = 'none';
        
        
        function display(){
        	address1Field.focus();
        	areaAndDistrict.forEach(element => {
        	    element.style.display = 'block';
        	});
        	searchAddress.forEach(element => {
        	    element.style.display = 'none';
        	});
        }
        
        function display1(){
        	address1Field.focus();
        	areaAndDistrict.forEach(element => {
        	    element.style.display = 'none';
        	});
        	searchAddress.forEach(element => {
        	    element.style.display = 'block';
        	});
        }
        
        
        	function previousPage() {
        		loadingPage.style.display = 'flex';
        	  window.history.go(-1);
        	  loadingPage.style.display = 'none';
        	}
        	
        	var textarea = document.getElementById("image_host_url");

            textarea.addEventListener("input", function () {
             var inputString = textarea.value;
             var regex = /\[img\](.*?)\[\/img\]/;

             var match = regex.exec(inputString);

             if (match) {
                 // The URL is in match[1]
                 var extractedURL = match[1];
                 console.log("Extracted URL: " + extractedURL);
                 document.getElementById("team_image").value = extractedURL;
                 document.getElementById("team_image_show").setAttribute("src", extractedURL);
             } else {
                 console.log("No URL found between [img] and [/img]");
             }
            });
		</script>
    </body>
</html>