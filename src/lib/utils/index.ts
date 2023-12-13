import FileSaver from 'file-saver';
import clsx, { ClassValue } from 'clsx'

export function cn(...classes: ClassValue[]) {
  return (clsx(classes))
}

export async function downloadImage(_id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.webp`);
}