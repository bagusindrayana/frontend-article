<script>
    import ArticleItem from '../../components/ArticleItem.svelte';
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import {
        ArrowLeftOutline,
        ArrowRightOutline,
    } from "flowbite-svelte-icons";

    /** @type {Array<{
     *  id: number;
     * title: string;
     * content: string;
     * category: string;
     * created_date: string;
     * updated_date: string;
     * status: string;
     * }>} items
     */
    let items = [];

    let curPage = 1;
    let canNext = false;
    let canPrev = false;
    let nextPage = () => {
        curPage++;
        fetchData();
    };

    let prevPage = () => {
        curPage--;
        fetchData();
    };

    function fetchData() {
        fetch(
            `${PUBLIC_API_URL}/article?status=publish&page=${curPage}`,
        )
            .then((res) => res.json())
            .then((data) => {
                items = data.data;
            })
            .catch((err) => {
                alert("Failed to fetch data!");
                console.error(err);
            });
    }

    

    onMount(() => {
        fetchData();
    });
</script>
<svelte:head>
    <title>My Articles 📰!</title>
</svelte:head>


  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">📝 My Articles!</h2>
        </div> 
        <div class="grid gap-8 lg:grid-cols-2">
             
            {#each items as item}
            <ArticleItem id={item.id} title="{item.title}" content="{item.content}" category="{item.category}" createdDate="{item.created_date}"/>
            {/each}
                              
        </div>  
        <div class="inline-flex justify-center w-full mt-8">
            <button
                on:click={prevPage}
                disabled={!canPrev}
                class="flex items-center justify-center px-4 h-10 text-base font-medium bg-white text-gray-800 rounded-s hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
            >
                <ArrowLeftOutline /> Prev
            </button>
            <button
                on:click={nextPage}
                disabled={!canNext}
                class="flex items-center justify-center px-4 h-10 text-base font-medium bg-white text-gray-800 border-0 border-s border-gray-300 rounded-e hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <ArrowRightOutline /> Next
            </button>
        </div>
    </div>
  </section>