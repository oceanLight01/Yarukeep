<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HabitCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'children' => HabitCommentResource::collection($this->children),
            'id' => $this->id,
            'item_id' => $this->habit_id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'screen_name' => $this->user->screen_name
            ],
            'parent_id' => $this->parent_id,
            'comment' => $this->comment,
            'created_at' => $this->created_at
        ];
    }
}
