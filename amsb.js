function get_rss_feed() {
    //clear the content in the div for the next feed.
    $("#podcast-list").empty();

    //use the JQuery get to grab the URL from the selected item, put the results in to an argument for parsing in the inline function called when the feed retrieval is complete
    $.get("http://automatemysmallbusiness.com/feed/podcast/", null, function (d) {

        //find each 'item' in the file and parse it
        $(d).find('item').each(function () {

			debug.log('next item');
			
			try
			{
	            //name the current found item this for this particular loop run
	            var $item = $(this);
	            // grab the post title
	            var title = $item.find('title').text();
	            // grab the post's URL
	            var link = $item.find('enclosure').attr('url');
	            // next, the description
	            var description = $item.find('description').text();
	            //don't forget the pubdate
	            var pubDate = new Date( $item.find('pubDate').text()).toLocaleDateString();

	            // now create a var 'html' to store the markup we're using to output the feed to the browser window
	            var html = "<li><div><h4 class=\"\"><a href=\"" + link + "\" target=\"_blank\">" + title + "<\/a><\/h4>";
	            html += "<p class=\"ul-li-aside ul-li-desc\"><em>" + pubDate + "<\/em><\/p>";
	            html += "<p class=\"ul-li-desc\">" + description + "</p>";
	            html += "<\/div><\/li>";

	            //put that feed content on the screen!
	            $('#podcast-list').append($(html));
			}
			catch(e)
			{
				debug.error(e.message)
			}
        });

        $('#podcast-list').listview('refresh');

    }, 'xml');
};

function onDeviceReady() {
	$.ajaxSetup({
        error: function (x, e) {
            if (x.status == 0) {
                alert('You are offline!!\n Please Check Your Network.');
            } else if (x.status == 404) {
                alert('Requested URL not found.');
            } else if (x.status == 500) {
                alert('Internel Server Error.');
            } else if (e == 'parsererror') {
                alert('Error.\nParsing JSON Request failed.');
            } else if (e == 'timeout') {
                alert('Request Time out.');
            } else {
                alert('Unknow Error.\n' + x.responseText);
            }
        }
    });

	$('div#podcast').live('pageshow', function (event, ui) {
        get_rss_feed();
    });
}

document.addEventListener("deviceready",onDeviceReady,false); 