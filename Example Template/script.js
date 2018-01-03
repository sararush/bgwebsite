// Class for User, which represents a person that uses the app.
class User{
    constructor(end_info, start_info, lat, long) {
        this.end = end_info;
        this.start = start_info;
        this.latitude = lat;
        this.longitude = long;
    }

    get end_info() {
        return this.end;
    }

    get start_info() {
        return this.start;
    }

    get lat() {
        return this.latitude;
    }

    get long() {
        return this.longitude;
    }
}

// Global variables
var map = null;
var users = [];
var emails = [];

// Initialize map and propagate hard-coded values.
function initMap() {
	var keon = new User(
                '<strong>Keon\'s Destination</strong><br>\
					1930 Channing Way<br> Berkeley, CA 94704<br>\
					<a href="http://tinyurl.com/keondestination">Get Directions</a>',
                '<strong>Keon\'s Destination</strong><br>\
                    California Memorial Stadium, 2227 Piedmont Ave <br> Berkeley, CA 94720<br>',
                37.865108,
		        -122.270834
    );
	var sapto = new User(
                '<strong>Sapto\'s Destination</strong><br>\
					2015 Haste Street<br> Berkeley, CA 60657<br>\
					<a href="http://tinyurl.com/saptodestination">Get Directions</a>',
                '<strong>Sapto\'s Destination</strong><br>\
                California Memorial Stadium, 2227 Piedmont Ave <br> Berkeley, CA 94720<br>',
		        37.864919,
		        -122.269240
	);
	var niels = new User(
		        '<strong>Niels\' Destination</strong><br>\r\
					1576 Hawthorne Terrace<br> Berkeley, CA 94708<br>\
					<a href="http://tinyurl.com/nielsdestination">Get Directions</a>',
                '<strong>Niels\' Destination</strong><br>\
                    California Memorial Stadium, 2227 Piedmont Ave <br> Berkeley, CA 94720<br>',
    	        37.879768,
                -122.262727
	);
    users.push(keon, sapto, niels);
    emails.push("keonktsang@gmail.com", "banerjee.saptarshi44@gmail.com");
    map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: new google.maps.LatLng(37.871899, -122.258540),
                mapTypeId: google.maps.MapTypeId.ROADMAP
                });
    updateMap();
}

// Updates the global map by reiterating over users and placing markers.
function updateMap() {
    var infowindow = new google.maps.InfoWindow({});
	var marker, i;

	for (i = 0; i < users.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(users[i].lat, users[i].long),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(users[i].end_info);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

// Finds a partner for the first user in queue and creates a new pair.
function create_pair() {
    var new_pair = match_closest(0);
    select
}


function rad(x) {
    return x*Math.PI/180;
}

/**
    Find the destination closest to that of the user from the specified index of users.
    @param the index of the user being chosen, typically 0 due to FIFO queue.
    @return a pair of indices in the form of a two-item list.
*/
function match_closest(index) {
    var lat = users[index].lat;
    var lng = users[index].long;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for(i = 0; i < users.length; i++) {
        if (i != index)
            var mlat = users[i].lat;
            var mlng = users[i].long;
            var dLat  = rad(mlat - lat);
            var dLong = rad(mlng - lng);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            distances[i] = d;
            if ( closest == -1 || d < distances[closest] ) {
                closest = i;
            }
    }
    return [index, closest];
}

function get_pair(pair, list) {
    var first = list[pair[0]];
    var second = list[pair[1]];
    if (pair[0] < pair[1]) {
        list.splice(second, 1);
        list.splice(first, 1);
    } else {
        list.splice(first, 1);
        list.splice(second, 1);
    }
    return [first, second];
}

/**
    Announce match to both selected and remove them from the map and database.
    @param A two-item list of the indices of the two users matched.
*/
function select_pair(pair) {
    var retrieved_pair = get_pair(pair, users);
    alert("A partner has been found! Here is your meetup location.");
    // Sammy does push notification for matching finished, and remove from database. Update page for them
    // Updated page has to have Cisco Spark implemented.
}


// Initializes the Cisco Spark API
function start_spark(pair) {
    var retrieved_pair = get_pair(pair, emails);
    // Somehow call the html file?
}
