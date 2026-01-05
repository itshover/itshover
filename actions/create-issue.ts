"use server";

export async function createIssue(formData: FormData) {
    const category = formData.get("category") as string;
    const links = formData.get("links") as string;
    const handle = formData.get("handle") as string;

    if (!category) {
        return { error: "Category is required" };
    }

    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (!token) {
        return { error: "Server configuration error" };
    }

    const title = `Request: [${category}] Icon`;
    const body = `
**Category:** ${category}
**Reference Links:**
${links || "None provided"}

**Requested by:** ${handle || "Anonymous"}
  `.trim();

    try {
        const response = await fetch("https://api.github.com/repos/itshover/itshover/issues", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({ title, body }),
        });

        if (!response.ok) {
            return { error: "Failed to create issue on GitHub" };
        }

        const issue = await response.json();
        return { success: true, url: issue.html_url };
    } catch (err) {
        return { error: "Internal server error" };
    }
}
