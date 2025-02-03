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
    <form class="mb-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="post_slug" value={post_slug} />

      <div class="space-y-2">
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
    <input
      type="text"
      id="name"
      name="name"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
    />
        {errors().fields?.name && (
          <p class="text-red-500 error-msg">
            {Array.isArray(errors().fields?.name)
              ? (errors().fields?.name as string[]).join(', ')
              : errors().fields?.name}
          </p>
        )}
      </div>

      <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
    />
        {errors().fields?.email && (
          <p class="text-red-500 error-msg">
            {Array.isArray(errors().fields?.email)
              ? (errors().fields?.email as string[]).join(', ')
              : errors().fields?.email}
          </p>
        )}
      </div>

      <div class="space-y-2">
      <label for="message" class="block text-sm font-medium text-gray-700">Comentario:</label>
    <textarea
      id="message"
      name="message"
      rows="4"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
        class="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        Add Comment
      </button>

      {errors().message && (
        <p class="text-red-500 error-msg mt-4">{errors().message}</p>
      )}
    </form>
  );
};
