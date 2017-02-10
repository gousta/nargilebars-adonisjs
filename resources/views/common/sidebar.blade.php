<ul class="nav nav-list sideNavigation">
    <li class="nav-header">ΚΑΤΑΣΤΗΜΑΤΑ</li>
    @foreach($stores as $row)
        <li {{ ($row['key'] == $store['key']) ? 'class="active"':'' }}><a href="{{ $row['key'] }}">{{ $row['title'] }}</a></li>
    @endforeach
</ul>