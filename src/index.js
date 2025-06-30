export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    if (pathname === "/callback") {
      const site = searchParams.get("site_id");
      const token = searchParams.get("token");

      return new Response(
        `<script>
           window.opener.postMessage({ token: '${token}', site_id: '${site}' }, '*');
           window.close();
         </script>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new Response("Not found", { status: 404 });
  }
}
