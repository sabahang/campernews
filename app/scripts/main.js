
$.getJSON( "http://www.freecodecamp.com/news/hot", function( data ) {
	// Sort news in Descending order
	data.sort(function(a,b){
	  return b.timePosted - a.timePosted;
	});
	// Get the Latest news Date and increasing it to trigger the below if clause
	var newsItems = [], latestNewsDay = new Date(data[0].timePosted).getUTCDate() + 1 ;
	//first timestamp
	newsItems.push("<div class='panel-heading'><h1>Camper&nbsp;News</h1></div>");
	$.each( data, function( key, val ) {
		// Add timestamp if necessary
		var newsDate = new Date(val.timePosted), firstEvent = false;
		if (latestNewsDay != newsDate.getUTCDate()){
			newsItems.push($('<li />',{'class': 'year' + ((key === 0) ? ' first':''), html: newsDate.toUTCString().split(" ").splice(0,4).join(" ")}).prop('outerHTML'));
			latestNewsDay = newsDate.getUTCDate();
			firstEvent = true;
		} 
		// Add news item elements
		var itemElements = [], text =[];
		itemElements.push($('<a/>', { 'class' : Object.keys(val)[9] , 'href' : val.link, 'target':'_blank', html:
			$('<img/>', { src: getImgLink(val), onerror: "javascript: this.src='images/not-found.png'" }).prop('outerHTML')
		}).prop('outerHTML'));
		// Add text details
		text.push($('<a/>', {'class' : Object.keys(val)[1], 'href' : val.link, 'target':'_blank', html:
			$('<span/>', { html: shorten(val.headline)}).prop('outerHTML')
		}).prop('outerHTML'));

		text.push($('<a/>', {'class' : Object.keys(val.author)[2], 'href' : 'http://www.freecodecamp.com/' + val.author.username, 'target':'_blank', html:
			$('<span/>', { html: "by " + val.author.username}).prop('outerHTML')
		}).prop('outerHTML'));

		//text.push($('<span />',{'class': Object.keys(val.author)[2], html: "by " + val.author.username}).prop('outerHTML'));
		text.push($('<span />',{'class': Object.keys(val)[6], html: val.rank + "&nbsp;<i class='fa fa-thumbs-up'></i>"}).prop('outerHTML'));
		//text.push($('<span />',{'class': Object.keys(val)[2], html: new Date(val.timePosted).toUTCString().split(" ").splice(4).join(" ")}).prop('outerHTML'));

		itemElements.push($("<div />",{'class':'detail', html: text.join('')}).prop('outerHTML'));

		// Add news item
		newsItems.push($("<li />", {'class': 'event' + (firstEvent ? ' offset-first' : ''),'id': key, html: itemElements.join('')}).prop('outerHTML'));
	});

	$( "<ul />", {
		'class': 'timeline',
		html: newsItems.join( "" )
	}).appendTo('body');

});

function shorten(str){
	return (str.length > 50) ? str.replace(/^(.{20}[^\s]*).*/, "$1") + "..." : str;
}
function getImgLink(news){
	return (news.image !== "") ? news.image : news.author.picture;
}
function getImgHeight(imgLink){
	var image = new Image();
	image.src = imgLink;
	console.log(image.height);
	return image.height;
}
