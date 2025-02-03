import { createSignal } from 'solid-js';
import { actions, isInputError } from 'astro:actions';

interface Props {
  post_slug: string;
}

export default function CommentForm({post_slug}: Props) {
  const [errors, setErrors] = createSignal<{
    message?: string;
    fields?: Record<string, string | string[]>;
  }>({});

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    setErrors({});

    try {
      const { error } = await actions.addComment(formData);

      if (error) {
        if (isInputError(error)) {
          setErrors({ fields: error.fields });
        } else {
          setErrors({ message: error.message });
        }
      } else {
        form.reset();
        alert('¡Comentario enviado con éxito!');
      }
    } catch (error) {
      setErrors({ message: 'Error inesperado al enviar el comentario' });
    }
  };

  return (
    <form class="mb-8" onSubmit={handleSubmit}>
      <input type="hidden" name="post_slug" value={post_slug} />

      <div class="mb-4">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          class="w-full p-2 border rounded"
        />
        {errors().fields?.name && (
          <p class="text-red-500 error-msg">
            {Array.isArray(errors().fields?.name)
              ? (errors().fields?.name as string[]).join(', ')
              : errors().fields?.name}
          </p>
        )}
      </div>

      <div class="mb-4">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class="w-full p-2 border rounded"
        />
        {errors().fields?.email && (
          <p class="text-red-500 error-msg">
            {Array.isArray(errors().fields?.email)
              ? (errors().fields?.email as string[]).join(', ')
              : errors().fields?.email}
          </p>
        )}
      </div>

      <div class="mb-4">
        <label for="message">Comment:</label>
        <textarea
          id="message"
          name="message"
          class="w-full p-2 border rounded"
        ></textarea>
        {errors().fields?.message && (
          <p class="text-red-500 error-msg">
            {Array.isArray(errors().fields?.message)
              ? (errors().fields?.message as string[]).join(', ')
              : errors().fields?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Add Comment
      </button>

      {errors().message && (
        <p class="text-red-500 error-msg mt-4">{errors().message}</p>
      )}
    </form>
  );
};
