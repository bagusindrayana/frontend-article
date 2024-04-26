<script>
    import { Tabs, TabItem } from "flowbite-svelte";
    import PublishedTable from "../../components/PublishedTable.svelte";
    import DraftTable from "../../components/DraftTable.svelte";
    import TrashedTable from "../../components/TrashedTable.svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
    
</script>

<section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="flex gap-2 my-4">
            <a
                href="/posts/create"
                class="flex text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <PlusOutline /> Add New Article
            </a>
        </div>
        <Tabs>
            <TabItem open title="Published">
                <PublishedTable/>
            </TabItem>
            <TabItem title="Drafts">
                <DraftTable/>
            </TabItem>
            <TabItem title="Trashed">
                <TrashedTable/>
            </TabItem>
        </Tabs>
    </div>
</section>
