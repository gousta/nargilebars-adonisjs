@include('common.head')

@include('common.menu')

    <div class="row">

        <div class="col-lg-12">
            

            <div class="row">
                <div class="col-lg-10">

                    @include('common.map-single')

                    <div class="store">
                        <a class="btn pull-right" target="_blank" href="http://maps.google.com/?q={{ urlencode($store['address']['street'].', '.$store['address']['area'].', '.$store['address']['region'].', '.$store['address']['zip']) }}"><i class="icon-location-arrow"></i> Διαδρομή</a>
                        <h3 class="title">{{ $store['title'] or '' }}</h3>

                        <p>{{ $store['content'] or '' }}</p>

                        <address>
                            <i class="icon-map-marker"></i>
                            {{ $store['address']['street'] or '' }}, {{ $store['address']['area'] or '' }}, {{ $store['address']['region'] or '' }} {{ $store['address']['zip'] or '' }}
                        </address>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-2 col-fixed">
            @include('common.sidebar')
        </div>
    </div>

@include('common.foot')
@include('common.end')
