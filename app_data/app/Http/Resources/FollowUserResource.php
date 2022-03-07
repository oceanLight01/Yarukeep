<?php

namespace App\Http\Resources;

use App\Models\Follow;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class FollowUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $following = Follow::where('user_id', Auth::id())->where('following_user_id', $this->id)->exists();
        $followed_by = Follow::where('following_user_id', Auth::id())->where('user_id', $this->id)->exists();
        $following_count = Follow::where('user_id', $this->id)->count();
        $followers_count = Follow::where('following_user_id', $this->id)->count();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'screen_name' => $this->screen_name,
            'profile' => $this->profile,
            'profile_image' => $this->profile_image,
            'following' => $following,
            'followed_by' => $followed_by,
            'following_count' => $following_count,
            'followers_count' => $followers_count,
            'created_at' => $this->created_at,
        ];
    }
}
