/**
 * Interface responsavel por listar serviços necessarios
 * @argument I - Interface DTO que representa a entidade no sistema
 * @argument D - Dominio da entidade
 */
export default interface IService<I, D> {
  create(dto: I): Promise<D>;
  readAll(): Promise<D[]>;
  readOne(id: string): Promise<D>;
  update(id: string, dto: I): Promise<D>;
  delete(id: string): Promise<void>;
}
