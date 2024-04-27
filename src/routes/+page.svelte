<script>
    // import ArticleItem from '../components/ArticleItem.svelte';
    // import { onMount } from "svelte";
    // import { PUBLIC_API_URL } from "$env/static/public";

    // /** @type {Array<{
    //  *  id: number;
    //  * title: string;
    //  * content: string;
    //  * category: string;
    //  * created_date: string;
    //  * updated_date: string;
    //  * status: string;
    //  * }>} items
    //  */
    // let items = [];

    // function fetchData() {
    //     fetch(
    //         `${PUBLIC_API_URL}/article?status=publish`,
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             items = data.data;
    //         })
    //         .catch((err) => {
    //             alert("Failed to fetch data!");
    //             console.error(err);
    //         });
    // }

    // onMount(() => {
        
    // });
</script>
<svelte:head>
    <title>My Articles 📰!</title>
</svelte:head>


  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">📝 My Articles!</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400 mb-8">
                This app built with Svelte, Tailwindcss and Flowbite, and backend with Python and FastAPI!
            </p>
            <a type="button" href="/posts" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Lets ✍️ your own articles!</a>
        </div> 
        
    </div>
  </section>