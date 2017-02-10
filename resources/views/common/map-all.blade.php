

@foreach($stores as $store)
    <div id="content_{{ $store['key'] }}" class="modalbox">
        <h1 class="modalbox-title">{{ $store['title'] }}</h1>
        <hr class="modalbox-line"/>
        <address class="modalbox-address">
            {{ $store['address']['street'] }}, {{ $store['address']['area'] }}, {{ $store['address']['region'] }} {{ $store['address']['zip'] }}
        </address>
        <p class="modalbox-content">{{ $store['content'] }}</p>
    </div>
@endforeach

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

<script>

    function initialize() {

        var p_mapcenter = new google.maps.LatLng(37.983022, 23.720169);

        @foreach($stores as $store)
            var p_{{ $store['key'] }} = new google.maps.LatLng({{ $store['position']['lat'] }}, {{ $store['position']['lng'] }});
        @endforeach

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
            zoom: 12,
            center: p_mapcenter,
            scrollwheel: false,
            mapTypeControlOptions: {
                 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
            }
        }

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
        map.mapTypes.set('tehgrayz', mapType);
        map.setMapTypeId('tehgrayz');

        @foreach($stores as $store)
            var w_{{ $store['key'] }} = new google.maps.InfoWindow({
                content: document.getElementById('content_{{ $store['key'] }}').innerHTML, maxWidth: 500
            });
        @endforeach

        @foreach($stores as $store)
            var m_{{ $store['key'] }} = new google.maps.Marker({
                position: p_{{ $store['key'] }},
                map: map,
                title: '{{ $store['title'] }}',
                icon: '/icon/{{ $store['icon'] }}'
            });
        @endforeach

        @foreach($stores as $store)
            google.maps.event.addListener(m_{{ $store['key'] }}, 'click', function() {

                @foreach($stores as $row)
                    if (w_{{ $row['key'] }}) { w_{{ $row['key'] }}.close() }
                @endforeach

                w_{{ $store['key'] }}.open(map, m_{{ $store['key'] }});
            });
        @endforeach

    }

    google.maps.event.addDomListener(window, 'load', initialize);

</script>

<div id="map-canvas"></div>
