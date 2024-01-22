// Functions
import { generateUUID } from "@app-core/functions/generate-uuid";
// Interfaces
import { Task } from "@app-core/interfaces/task.interface";

// TODO: Add better mock
export const InitialTasksMock: Task[] = [
  {
    id: '6b5c8a0e-5930-48d7-b95f-700d34de1f6a',
    title: 'Grocery Shopping',
    description: "It's time to restock the pantry and fridge."
  },
  {
    id: '75472bad-4469-4121-abea-7f2c20324918',
    title: 'Plan Family Movie Night',
    description: "Going to the movies with the family to see the new Tarantino movie. We meet at 17:00 at Mom's house and then we have to pick up Sandra who is waiting for us in the park in front of her house. The movie starts at 18:00. Afterwards, we plan to have dinner at an Italian restaurant that has opened in the square and if we feel like it, we can go for a walk in the center of the city."
  },
  {
    id: '4a71c323-f096-4b5d-949e-8b59b5298776',
    title: 'Organize Closet',
    description: "Putting away summer clothes and preparing winter clothes, organizing drawers, etc."
  },
  {
    id: 'fc8389de-31a4-4889-93a2-29c1606d91f7',
    title: 'Water the Plants',
    description: ""
  },
]

export const EmptyTask: Task = {
  id: generateUUID(),
  title: '',
  description: ''
}