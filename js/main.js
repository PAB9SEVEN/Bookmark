var sitename=document.getElementById("sitename");
var siteurl=document.getElementById("siteurl");
var submit =document.getElementById("submit");
document.getElementById("myform").addEventListener("submit",savebookmark);
function savebookmark(e)
{
        var x=sitename.value;
        var y=siteurl.value;
        //localStorage.setItem("test","helloworld");
        //alert(localStorage.getItem("test"));
if(!validate(x,y)){
  return false;
    
}
        //localStorage.removeItem("test");
        //alert(localStorage.getItem("test"));
        var bookmark={
            name:x,
            url:y
        }
//alert(bookmark)
if(localStorage.getItem("bookmarklist")===null){
    var bookmarklist=[];
    bookmarklist.push(bookmark);
    localStorage.setItem('bookmarklist',JSON.stringify(bookmarklist));
    
}
        else{
            var bookmarklist=JSON.parse(localStorage.getItem('bookmarklist'));
            bookmarklist.push(bookmark);
            localStorage.setItem('bookmarklist',JSON.stringify(bookmarklist));
        }
        document.getElementById("myform").reset();
       fetch();
    e.preventDefault();
    

 
    
    }

    
function deletebookmark(url)
{
    var bookmarklist=JSON.parse(localStorage.getItem('bookmarklist'));
for(var i=0;i<bookmarklist.length;i++) {
    if(bookmarklist[i].url===url)
    {
        bookmarklist.splice(i,1);
    }
}
        bookmarklist=localStorage.setItem('bookmarklist',JSON.stringify(bookmarklist));
        
    fetch();
    

}
function fetch(){
    var bookmarklist=JSON.parse(localStorage.getItem('bookmarklist'));
    var bookmarkresults=document.getElementById("bookmarkresults");
    bookmarkresults.innerHTML="";
    
    for(var i=0;i<bookmarklist.length;i++){
        
        var name=bookmarklist[i].name;
        var url=bookmarklist[i].url;    
    
        
    bookmarkresults.innerHTML += '<div class="well">'+
                                 '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
    
}

function validate(sitename,siteurl){
  if(sitename=="" || siteurl=="")
  {
    alert("please fill in the credentials");
    return false;

  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteurl.match(regex)){
    alert("please use the proper format");
    return false;

  }
  return true;

}