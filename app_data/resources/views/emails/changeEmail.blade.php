<a href="{{ config('app.url') }}">{{ config('app.name') }}</a>

<p>{{ __('メールアドレス変更のお手続きを承りました。') }}</p>
<p>
  {{ __('下記のURLをクリックして新しいメールアドレスを確定してください。') }}
</p>
<p>
  {{ $actionText }}: <a href="{{ $actionUrl }}">{{ $actionUrl }}</a>
</p>

<p>{{ __('※このURLの有効期限は1時間です。有効期限が切れた場合は、お手数ですが再度初めからお手続きを行なっていただきますようお願いいたします。') }}</p>