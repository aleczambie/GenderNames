document.querySelector("#resetBtn").style.display = "none";
document.querySelector("#message").style.display = "none"
document.querySelector("#relatedNames").style.display = "none";
document.querySelector("#birthname").focus();
document.body.style.backgroundColor = "#ffe5b4";

document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    getName();
    getRelatedNames();
});

document.querySelector("#resetBtn").addEventListener("click", function(e){
    e.preventDefault();
    restart();
})

async function getName() {

    let birthname = document.querySelector("#birthname").value;

    if(birthname.trim()===""){
        document.querySelector("#message").innerHTML = `Please enter a name`;
        document.querySelector("#message").style.display = "block";
        return;
    }
    let key = "al735510688";
    let url = `https://www.behindthename.com/api/lookup.json?name=${encodeURIComponent(birthname)}&key=${key}`;
    let response = await fetch(url);
    let data = await response.json();


    console.log(data);
    document.querySelector("#message").style.display = "block"

    if(data.error){
        document.querySelector("#message").innerHTML = "That name is not found, try again."
        
        
    } 
    else {
        let gender = data[0].gender;
        if (gender === "m"){
            document.querySelector("#message").innerHTML = `${birthname} is a male name!`;
            document.body.style.backgroundColor = "#a8d0f0";
        } 
        if(gender ==="f"){
            document.querySelector("#message").innerHTML = `${birthname} is a female name!`;
            document.body.style.backgroundColor = "#f9c2d1";
        }
        if (gender === "mf" || gender === "fm"){
            document.querySelector("#message").innerHTML = `${birthname} is a unisex name!`;
            document.body.style.backgroundColor = "#d9c2f0";
        }
    }

    document.querySelector("#relatedNames").style.display = "block";
    document.querySelector("#submitBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
    document.querySelector("#nameLabel").innerHTML = `${birthname}`;
    document.querySelector("#birthname").style.display = "none";
}

function restart(){

    document.querySelector("#nameLabel").innerHTML = `Enter a name: `;
    document.querySelector("#birthname").style.display = "inline";
    document.querySelector("#submitBtn").style.display = "inline";
    document.querySelector("#resetBtn").style.display = "none"
    document.querySelector("#message").innerHTML = "";
    document.querySelector("#birthname").value ="";
    document.body.style.backgroundColor = ""
    document.querySelector("#birthname").focus();
    document.body.style.backgroundColor = "#ffe5b4";
    document.querySelector("#message").style.display = "none"
    document.querySelector("#relatedNames").style.display = "none";

}

async function getRelatedNames(){

    let birthname = document.querySelector("#birthname").value;

    
    let key = "al735510688";
    let url = `https://www.behindthename.com/api/related.json?name=${encodeURIComponent(birthname)}&usage=eng&key=${key}`;
    let response = await fetch(url);
    let data = await response.json();

    if(data.error){
        document.querySelector("#message").innerHTML = "That name is not found, try again."
        document.querySelector("#relatedNames").style.display = "none"; // Add this line
    return;
}
    document.querySelector("#relatedNames").innerHTML = "Related names: "


    let i = 0;
    while(i < data.names.length){
        document.querySelector("#relatedNames").innerHTML += `${data.names[i]} `
        console.log(data.names[i]);
        i++;
    }
    


}
