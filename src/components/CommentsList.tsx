import { createSignal, createResource, For } from 'solid-js';
import type { Component } from 'solid-js';
import { actions } from "astro:actions";

interface Comment {
  name: string;
  email: string;
  message: string;
  post_slug: string;
  create_at: Date;
  id: number;
}

interface Props {
  post_slug: string;
}

const SolidCommentsList: Component<Props> = (props: Props) => {
  const fetchComments = async () => {
    // const response = await fetch(`/api/comments?post_slug=${props.post_slug}`);
    // return response.json();
    const { data } = await actions.getComments(props.post_slug);
    return data
  };

  const [comments] = createResource(fetchComments);

  return (
    <div class="space-y-4">
      <For each={comments()}>
        {(comment) => (
          <div class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow 
                    border-l-4 border-purple-600 group">
            <div class="flex items-baseline justify-between">
              <h3 class="text-lg font-semibold text-gray-800 group-hover:text-purple-700">
                {comment.name}
              </h3>
              <span class="text-sm text-gray-400">
                {new Date(comment.create_at).toLocaleDateString()}
              </span>
            </div>
            <p class="mt-3 text-gray-600 leading-relaxed">
              {comment.message}
            </p>
          </div>
        )}
      </For>
    </div>
  );
};

export default SolidCommentsList;