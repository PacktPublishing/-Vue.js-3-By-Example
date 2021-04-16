<template>
  <div>
    <div v-if="comments.length > 0">
      <h4>Comments</h4>
      <div v-for="c of comments" :key="c.id">{{c.user && c.user.login}} - {{c.body}}</div>
    </div>
  </div>
</template>

<script>
import { octokitMixin } from "../../../mixins/octokitMixin";

export default {
  name: "IssueComments",
  props: {
    owner: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
    issueNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  mixins: [octokitMixin],
  methods: {
    async getIssueComments(owner, repo, issueNumber) {
      if (
        typeof owner !== "string" ||
        typeof repo !== "string" ||
        typeof issueNumber !== "number"
      ) {
        return;
      }
      const octokit = this.createOctokitClient();
      const { data: comments } = await octokit.issues.listComments({
        owner,
        repo,
        issue_number: issueNumber,
      });
      this.comments = comments;
    },
  },
  watch: {
    owner: {
      immediate: true,
      handler(val) {
        this.getIssueComments(val, this.repo, this.issueNumber);
      },
    },
    repo: {
      immediate: true,
      handler(val) {
        this.getIssueComments(this.owner, val, this.issueNumber);
      },
    },
    issueNumber: {
      immediate: true,
      handler(val) {
        this.getIssueComments(this.owner, this.repo, val);
      },
    },
  },
};
</script>
