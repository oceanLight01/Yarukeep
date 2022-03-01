<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DiaryCommentResource extends JsonResource
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
            'children' => DiaryCommentResource::collection($this->children),
            'id' => $this->id,
            'item_id' => $this->diary_id,
            'user' => [
                'id' => $this->diary->habit->user->id,
                'name' => $this->diary->habit->user->name,
                'screen_name' => $this->diary->habit->user->screen_name,
            ],
            'parent_id' => $this->parent_id,
            'comment' => $this->comment,
            'created_at' => $this->created_at
        ];
    }
}
