import { fail } from '@sveltejs/kit';

let definition;

export const load = () => {
    return {
        definition
    }
}

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const word = formData.get('word');

        if (word.length < 1) {
            return fail(422, {
                error: true,
                message: 'Whoops, can’t be empty…'
            })
        } 
        
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        definition = data;

        return { success: true }
    }
}