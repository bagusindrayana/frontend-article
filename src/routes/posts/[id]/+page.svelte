<script>
    /** @type {{
     * id: number;
     * title: string;
     * content: string;
     * category: string;
     * created_date: string;
     * updated_date: string;
     * status: string;
     * }} data
     */
    export let data;
    import { onMount } from "svelte";
    /** @type {{
     * id: number;
     * title: string;
     * content: string;
     * category: string;
     * created_date: string;
     * updated_date: string;
     * status: string;
     * }} data
     */
    let article;
    /**
     * @type {string}
     */
    let readableCreatedDate;
    function getArticle() {
        article = data;
        //readableCreatedDate with format F- j, Y
        let date = new Date(article.created_date);
                readableCreatedDate = date.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
    }

    onMount(() => {
        getArticle();
    });
</script>

<svelte:head>
    <title>{data.title}</title>
    <link
        href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css"
        rel="stylesheet"
    />
</svelte:head>
<main
    class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased"
>
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article
            class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
        >
            <header class="mb-4 lg:mb-6 not-format">
                <address class="flex items-center mb-6 not-italic">
                    <div
                        class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
                    >
                        <img
                            class="mr-4 w-16 h-16 rounded-full"
                            src="https://avatar.iran.liara.run/public"
                            alt="Jese Leos"
                        />
                        <div>
                            <a
                                href="#"
                                rel="author"
                                class="text-xl font-bold text-gray-900 dark:text-white"
                                >Anonymous</a
                            >
                            <p
                                class="text-base text-gray-500 dark:text-gray-400"
                            >
                                {data.category}
                            </p>
                            <p
                                class="text-base text-gray-500 dark:text-gray-400"
                            >
                                <time
                                    pubdate
                                    datetime={data.created_date}
                                    title={readableCreatedDate}
                                    >{readableCreatedDate}</time
                                >
                            </p>
                        </div>
                    </div>
                </address>
                <h1
                    class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
                >
                    {data.title}
                </h1>
            </header>
            <div class="mb-8 not-format">
                {@html data.content}
            </div>
        </article>
    </div>
</main>
