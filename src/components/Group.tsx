import { z } from "zod";

export const groupSchema = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
  description: z.string().nullable(),
});

export type GroupSchema = z.infer<typeof groupSchema>;

export default function Group({ group }: { group: GroupSchema }) {
  return (
    <div className="mx-2 my-4">
      <h4 className="w-100 py-2 font-semibold md:text-lg">{group.name}</h4>
      <p>{group.description}</p>
    </div>
  );
}
