import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'
import type { MdFileData } from '@/types.ts'

export const supabase = createClient(
  'https://zjjmwppijkbikjkmffje.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqam13cHBpamtiaWtqa21mZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMjE3NzIsImV4cCI6MjAzMjc5Nzc3Mn0.CsyBTtJO9S0ErHT-7I1cM7VWn9zRXdQuRUcleLZrNqc',
)

export async function singUpUser(loginData: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  })
  if (error) return Promise.reject(error.message)
  return Promise.resolve(data)
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) return Promise.reject(error.message)
  return Promise.resolve()
}

export async function useCreateNewMdFileSupabase(newMdFileData: MdFileData) {
  const {id, ...rest} = newMdFileData
  const { data, error } = await supabase
    .from('md')
    .insert([rest])
    .select()
  if (error) return Promise.reject(error.message)
  return Promise.resolve()
}

export function useGetMdFile(userId: string) {
  const mdFileList = ref<MdFileData[]>([])
  async function getMdFile(userId: string) {
    try {
      const { data, error } = await supabase.from('md').select('*').eq('user_owner_id', userId)
      const response: MdFileData[] = data as MdFileData[]
      console.log(response)
      mdFileList.value = [...response]
    } catch (e) {
      console.log(e)
    }
  }
  getMdFile(userId)
  return { mdFileList, getMdFile }
}

export async function useUpdateMdFile(newMdContentValue: string, mdFileId: number) {
  console.log(newMdContentValue)
  const { data, error } = await supabase
    .from('md')
    .update({ content: newMdContentValue })
    .eq('id', mdFileId)
    .select('*')
  if (error) return Promise.reject(error.message)
  console.log('updated mdFileId', mdFileId)
  return Promise.resolve()
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, delay)
  }
}
