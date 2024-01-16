import config from "@/web/config"
import { QueryBuilder } from "objection"

class BaseQueryBuilder extends QueryBuilder {
  page(page) {
    return this.limit(config.pagination.limit).offset(
      (page - 1) * config.pagination.limit,
    )
  }

  softDelete(id) {
    return this.patchAndFetchById(id, { deletedAt: new Date().toISOString() })
  }

  active() {
    return this.whereNull("deletedAt")
  }
}

export default BaseQueryBuilder
