
<div id="content_{{ $store['key'] }}" class="modalbox">
    <h1 class="modalbox-title">{{ $store['title'] }}</h1>
    <hr class="modalbox-line"/>
    <address class="modalbox-address">
        {{ $store['address']['street'] }}, {{ $store['address']['area'] }}, {{ $store['address']['region'] }} {{ $store['address']['zip'] }}
    </address>
    <p class="modalbox-content">{{ $store['content'] }}</p>
</div>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

<script>

    function initialize() {

        var p_{{ $store['key'] }} = new google.maps.LatLng({{ $store['position']['lat'] }}, {{ $store['position']['lng'] }});

        var stylez = [
            {
                featureType: "",
                elementType: "",
                stylers: [
                    { saturation: -100 }
                ]
            }
        ];

        var mapOptions = {
            zoom: 15,
            center: p_{{ $store['key'] }},
            scrollwheel: false,
            mapTypeControlOptions: {
                 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
            }
        }

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
        map.mapTypes.set('tehgrayz', mapType);
        map.setMapTypeId('tehgrayz');

        var w_{{ $store['key'] }} = new google.maps.InfoWindow({
            content: document.getElementById('content_{{ $store['key'] }}').innerHTML, maxWidth: 500
        });

        var m_{{ $store['key'] }} = new google.maps.Marker({
            position: p_{{ $store['key'] }},
            map: map,
            title: '{{ $store['title'] }}',
            icon: '/icon/{{ $store['icon'] }}'
        });

        google.maps.event.addListener(m_{{ $store['key'] }}, 'click', function() {
            w_{{ $store['key'] }}.open(map, m_{{ $store['key'] }});
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize);

</script>

<div id="map-canvas" class="short"></div>
