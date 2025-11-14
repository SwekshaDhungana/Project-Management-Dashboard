export const defaultProjects = [
  {
    id: 1,
    name: "Project Orion",
    department: "Engineering",
    owner: {
      id: "u1",
      name: "Alice Johnson",
      email: "alice@company.com",
      contact: { phone: "555-1234", office: "HQ-201" },
    },
    status: "active",
    milestones: [
      {
        id: "m1",
        title: "MVP Launch",
        deadline: "2025-12-01",
        tasks: [
          {
            id: "t1",
            title: "Setup CI/CD",
            status: "completed",
            priority: "high",
            tags: ["devops", "automation"],
            assignedTo: [
              {
                id: "u2",
                name: "John",
                role: "Backend",
                skills: ["Node.js", "Docker"],
              },
              {
                id: "u3",
                name: "Eve",
                role: "DevOps",
                skills: ["AWS", "GitHub Actions"],
              },
            ],
            comments: [
              {
                id: "c1",
                by: "Alice",
                message: "Ensure blue-green deployment",
                date: "2025-09-10",
              },
            ],
          },
          {
            id: "t2",
            title: "API Design",
            status: "in-progress",
            priority: "medium",
            tags: ["backend", "api"],
            assignedTo: [
              {
                id: "u4",
                name: "Tom",
                role: "Backend",
                skills: ["Express", "SQL"],
              },
            ],
            comments: [],
          },
        ],
        documents: [
          {
            id: "d1",
            name: "Architecture Overview",
            type: "pdf",
            url: "/docs/architecture_overview.pdf",
          },
          {
            id: "d2",
            name: "Figma Prototype",
            type: "iframe",
            url: "https://www.figma.com/embed?file=12345",
          },
          {
            id: "d3",
            name: "Team Photo",
            type: "image",
            url: "/assets/team_orion.png",
          },
        ],
      },
    ],
    resources: {
      budget: 120000,
      spent: 64000,
      assets: [
        { id: "a1", name: "AWS EC2", type: "server", usage: 80 },
        { id: "a2", name: "Figma", type: "design", usage: 40 },
      ],
    },
    notifications: [
      {
        id: "n1",
        message: "Task 'Setup CI/CD' marked completed",
        type: "task",
        ref: { projectId: 1, milestoneId: "m1", taskId: "t1" },
        seen: false,
      },
      {
        id: "n2",
        message: "New comment on 'API Design'",
        type: "comment",
        ref: { projectId: 1, milestoneId: "m1", taskId: "t2" },
        seen: false,
      },
    ],
  },
  {
    id: 2,
    name: "Project Nebula",
    department: "Marketing",
    owner: { id: "u5", name: "Bob Lee", email: "bob@company.com" },
    status: "planning",
    milestones: [],
    resources: { budget: 40000, spent: 5000, assets: [] },
    notifications: [],
  },
];

// export function getProjects() {
//   const saved = localStorage.getItem("projects");
//   if (saved) {
//     try {
//       return JSON.parse(saved);
//     } catch {
//       return defaultProjects;
//     }
//   }
//   return defaultProjects;
// }
export function getProjects() {
  const saved = localStorage.getItem("projects");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((p) => ({
        ...p,
        documents: p.documents || [],
      }));
    } catch {
      return defaultProjects;
    }
  }
  return defaultProjects;
}

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
