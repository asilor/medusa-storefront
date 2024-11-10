function createRegion() {
  let regionId = $state("reg_01JC0KEK5W7QH9SRXYC85TS1ME");

  return {
    get id() {
      return regionId;
    }
  };
}

export const region = createRegion();
