function skillsMember() {
  return {
    name: "skillsMember",
    type: "member",
    methods: {
      getSkills: function () {
        return this.skills;
      },
    },
  };
}
