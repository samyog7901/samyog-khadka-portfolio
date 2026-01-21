# TODO: Project Section Enhancements

## Task: Filter Vercel production projects, add "Show More" toggle, and differentiate frontend/backend links

### Steps:
1. [ ] Update github-projects.tsx to filter only Vercel-deployed projects
2. [ ] Add "Show More" functionality to limit initial display and expand on click
3. [ ] Add logic to detect frontend (has Vercel URL) vs backend (no Vercel URL)
4. [ ] Display both Code and Site links for frontend projects
5. [ ] Display only Code link for backend projects
6. [ ] Update fallback projects to include Vercel-deployed projects only

### Changes Summary:
- Filter repos by homepage URL containing "vercel.app"
- Initial display: 6 projects with "Show More" button
- Expanded display: All projects with "Show Less" button
- Frontend projects: Show "Code" and "Site" buttons
- Backend projects: Show only "Code" button

### Status:
- [x] In Progress
- [x] Completed

