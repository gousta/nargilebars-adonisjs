@include('common.head')


@include('common.menu')

<div class="row">

    <div class="col-lg-12">
        @include('common.map-all')
    </div>

    <div class="col-lg-2 col-fixed">
        <ul class="nav nav-list sideNavigation">
            <li class="nav-header">ΚΑΤΑΣΤΗΜΑΤΑ</li>
            @foreach($stores as $store)
                <li><a href="{{ $store['key'] }}">{{ $store['title'] }}</a></li>
            @endforeach
        </ul>
    </div>
</div>


@include('common.foot')
@include('common.end')
