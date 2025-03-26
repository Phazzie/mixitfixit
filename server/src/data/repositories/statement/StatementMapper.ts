class StatementMapper {
  mapToEntity(data: Record<string, unknown>): Statement {
    return {
      id: data.id as string,
      userId: data.user_id as string,
      content: data.content as string,
      createdAt: new Date(data.created_at as string)
    };
  }
}