<script>
    import { ArrowLeftOutline, FloppyDiskAltSolid } from "flowbite-svelte-icons";
    import Quill from "quill";
    import { onMount } from "svelte";
    import { Label, Input, Select } from "flowbite-svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { goto } from "$app/navigation";

    /**
     * @type {string}
     */
    let status;

    let statuses = [
        { value: "draft", name: "Draft" },
        { value: "publish", name: "Publish" },
        // { value: "thrash", name: "Thrash" },
    ];

    /**
     * @type {string}
     */
     let title;

     /**
     * @type {string}
     */
     let category;


     function sendRequest() {
        /**
         * @type {string}
         */
        let content = "";
        const editor = document.querySelector(".ql-editor");
        if (editor) {
            content = editor.innerHTML;
        }
        //min title 20
        if (title.length < 20) {
            alert("Title must be at least 20 characters!");
            return;
        }

        let cleanContent = content.replace(/<[^>]*>?/gm, '');
        //min content 200
        if (cleanContent.length < 200) {
            alert("Content must be at least 200 characters!");
            return;
        }
        const data = { title, content, category, status };
        fetch(`${PUBLIC_API_URL}/article`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message == "success") {
                    alert("Article created successfully!");
                    goto("/posts");
                } else {
                    alert("Failed to save article!");
                }
            })
            .catch((err) => {
                alert("Failed to create article!");
                console.error(err);
            });
     }

    onMount(() => {
        const editor = new Quill("#editor", {
            theme: "snow",
        });
    });
</script>

<svelte:head>
    <title>Create New Article!</title>
    <link
        href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css"
        rel="stylesheet"
    />
</svelte:head>
<section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="flex gap-2 my-4">
            <a
                href="/posts"
                class="flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <ArrowLeftOutline /> Back
            </a>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Create New Article
        </h1>
        <div class="my-3">
            <Label for="title-input" class="block mb-2">Title</Label>
            <Input id="title-input" placeholder="Title..." bind:value={title} />
        </div>
        <div class="my-3">
            <Label for="editor" class="block mb-2">Content</Label>
            <div id="editor" >
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br /></p>
            </div>
        </div>
        
        <div class="my-3">
            <Label for="category-input" class="block mb-2">Category</Label>
            <Input id="category-input" placeholder="Category..." bind:value={category}/>
        </div>
        <div class="my-3">
            <Label for="status-input" class="block mb-2">Status</Label>
            <Select
                bind:value={status}
                id="status-input"
                placeholder="Status..."
            >
                {#each statuses as { value, name }}
                    <option {value}>{name}</option>
                {/each}
            </Select>
        </div>
        <div class="my-3">
            <button
                on:click={sendRequest}
                class="flex text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <FloppyDiskAltSolid/> Save
            </button>
        </div>
    </div>
</section>
