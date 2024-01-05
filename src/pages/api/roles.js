import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({ send, models: { RoleModel } }) => {
      const roles = await RoleModel.query()

      await send(roles)
    },
  ],
})

export default handler
