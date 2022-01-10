# Retro Tool Frontend ERD

**Note:** Some of the entities in this diagram do not have their own individual file declarations
and are part of other components. Not included are the various properties and methods.

```mermaid
erDiagram
          feedbackBoardContainer ||..|{ feedbackBoard : has
          feedbackBoardContainer ||..|{ feedbackBoardMetadataForm : has
          feedbackBoard ||--o{ feedbackColumn : has
          feedbackColumn ||--o{ feedbackColumnItem : contains
          feedbackColumnItem ||--|| feedbackItem : "has/is"
          feedbackColumnItem ||--o{ actionItem : "has/is"
          feedbackColumnItem ||--o{ feedbackGroup : "has/is"
          feedbackGroup ||--|{ feedbackItem : contains
          feedbackItem ||..o{ actionItem : references
          actionItem ||..|| feedbackBoard : references
          feedbackBoardContainer ||..o{ actionItem : references
```

[![A relationship diagram that illustrates the way the components are realted to one another.](https://mermaid.ink/img/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgICAgICAgZmVlZGJhY2tCb2FyZENvbnRhaW5lciB8fC4ufHsgZmVlZGJhY2tCb2FyZCA6IGhhc1xuICAgICAgICAgIGZlZWRiYWNrQm9hcmRDb250YWluZXIgfHwuLnx7IGZlZWRiYWNrQm9hcmRNZXRhZGF0YUZvcm0gOiBoYXNcbiAgICAgICAgICBmZWVkYmFja0JvYXJkIHx8LS1veyBmZWVkYmFja0NvbHVtbiA6IGhhc1xuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uIHx8LS1veyBmZWVkYmFja0NvbHVtbkl0ZW0gOiBjb250YWluc1xuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uSXRlbSB8fC0tfHwgZmVlZGJhY2tJdGVtIDogXCJoYXMvaXNcIlxuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uSXRlbSB8fC0tb3sgYWN0aW9uSXRlbSA6IFwiaGFzL2lzXCJcbiAgICAgICAgICBmZWVkYmFja0NvbHVtbkl0ZW0gfHwtLW97IGZlZWRiYWNrR3JvdXAgOiBcImhhcy9pc1wiXG4gICAgICAgICAgZmVlZGJhY2tHcm91cCB8fC0tfHsgZmVlZGJhY2tJdGVtIDogY29udGFpbnNcbiAgICAgICAgICBmZWVkYmFja0l0ZW0gfHwuLm97IGFjdGlvbkl0ZW0gOiBSZWZlcmVuY2VzXG4gICAgICAgICAgYWN0aW9uSXRlbSB8fC4ufHwgZmVlZGJhY2tCb2FyZCA6IHJlZmVyZW5jZXNcbiAgICAgICAgICBmZWVkYmFja0JvYXJkQ29udGFpbmVyIHx8Li5veyBhY3Rpb25JdGVtIDogcmVmZXJlbmNlc1xuICAgICAgICAgICAgIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid.live/edit/#eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgICAgICAgZmVlZGJhY2tCb2FyZENvbnRhaW5lciB8fC4ufHsgZmVlZGJhY2tCb2FyZCA6IGhhc1xuICAgICAgICAgIGZlZWRiYWNrQm9hcmRDb250YWluZXIgfHwuLnx7IGZlZWRiYWNrQm9hcmRNZXRhZGF0YUZvcm0gOiBoYXNcbiAgICAgICAgICBmZWVkYmFja0JvYXJkIHx8LS1veyBmZWVkYmFja0NvbHVtbiA6IGhhc1xuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uIHx8LS1veyBmZWVkYmFja0NvbHVtbkl0ZW0gOiBjb250YWluc1xuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uSXRlbSB8fC0tfHwgZmVlZGJhY2tJdGVtIDogXCJoYXMvaXNcIlxuICAgICAgICAgIGZlZWRiYWNrQ29sdW1uSXRlbSB8fC0tb3sgYWN0aW9uSXRlbSA6IFwiaGFzL2lzXCJcbiAgICAgICAgICBmZWVkYmFja0NvbHVtbkl0ZW0gfHwtLW97IGZlZWRiYWNrR3JvdXAgOiBcImhhcy9pc1wiXG4gICAgICAgICAgZmVlZGJhY2tHcm91cCB8fC0tfHsgZmVlZGJhY2tJdGVtIDogY29udGFpbnNcbiAgICAgICAgICBmZWVkYmFja0l0ZW0gfHwuLm97IGFjdGlvbkl0ZW0gOiBSZWZlcmVuY2VzXG4gICAgICAgICAgYWN0aW9uSXRlbSB8fC4ufHwgZmVlZGJhY2tCb2FyZCA6IHJlZmVyZW5jZXNcbiAgICAgICAgICBmZWVkYmFja0JvYXJkQ29udGFpbmVyIHx8Li5veyBhY3Rpb25JdGVtIDogcmVmZXJlbmNlc1xuICAgICAgICAgICAgIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRhcmtcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)
